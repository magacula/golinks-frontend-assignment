import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Repository } from "./components/Repository";
import { Commit } from "./components/Commit";
import { CommitContent } from "./components/CommitContent";
import { fetchData } from "./api/api";
import { Button } from "./components/Button";

/***** App Styles ****/
const AppContainer = styled.div`
  margin: 0 20rem;

  @media only screen and (max-width: 1440px) {
    margin: 0 7rem;
  }
  @media only screen and (max-width: 1024px) {
    margin: 0 1.5rem;
  }
`;

const FormContainer = styled.div`
  margin-top: 25px;
  position: relative;
  cursor: pointer;

  button {
    margin-left: 0.5rem;
    @media only screen and (max-width: 425px) {
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }
`;

const Search = styled.input`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  background-color: #0d1117;
  background-repeat: no-repeat;
  background-position: right 8px center;
  color: #c9d1d9;
  padding-left: 30px;
  border: 2px solid #22262c;
  border-radius: 6px;
  min-width: 300px;
  /* text-transform: capitalize; */

  &:focus {
    border-color: #1f6feb;
    outline: none;
    box-shadow: rgb(12, 45, 107) 0px 0px 0px 3px;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  text-align: center;
  width: 20px;
  height: 16px;
  fill: #c9d1d9;
`;

const HeadingContainer = styled.div`
  margin-top: 3rem;
`;

const Title = styled.div`
  h1 {
    color: #58a6ff;
    font-weight: 600;
  }
`;

const SectionHeading = styled.div`
  margin-top: 0.25rem;
`;

const MainContainer = styled.div`
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

const RepoCount = styled.span`
  display: inline-block;
  min-width: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2em;
  background-color: rgba(110, 118, 129, 0.4);
`;

const SideBar = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  bottom: 0;
  overflow-y: auto;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 600px;
  z-index: 5;
  margin: 0;
  padding: 0 40px 40px 0;
  top: 180px;
  position: absolute;

  .section-heading {
    color: #c9d1d9;
    font-weight: 500;
    font-size: 1.25rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0 40px 0;
  }

  @media only screen and (max-width: 425px) {
    top: 215px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;

  button {
    margin-left: 0.5rem;
    min-width: 32px;
    padding: 5px 10px;
    font-style: normal;
    line-height: 20px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: transparent;
    border-color: #c9d1d9;
    color: #f0f6fc;
    margin-right: 5px;

    &.active-page {
      background-color: #58a6ff;
      border-color: #58a6ff;
    }
  }

  button:hover {
    cursor: pointer;
    background-color: #58a6ff;
    border-color: #58a6ff;
    transition: ease-in 0.5s cubic-bezier(0.3, 0, 0.5, 1);
  }
`;

const MobileCommitContent = styled.div`
  overflow-y: auto;
  margin-left: 600px;
  padding: 16px 48px;
  width: 600px;
  top: 180px;
  position: fixed;
  bottom: 0;

  button {
    margin-left: 0;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 1024px) {
    background-color: #0d1117;
    margin-left: 0;
    z-index: 6;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (max-width: 425px) {
    top: 215px;
    padding: 16px 25px;
  }
`;

function App() {
  const [orgName, setOrgName] = useState("");
  const [title, setTitle] = useState(null);

  const [totalRepos, setTotalRepos] = useState(0);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const [showCommits, setShowCommits] = useState(true);

  const [resize, setResize] = useState(false);

  // ref used to target scrollable element to scroll back to top after switching pages
  const scrollableElementRef = useRef();
  // ref used to target input field to be cleared on button submit
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orgName !== "") {
      fetchRepos(1);
    } else {
      alert("Please enter a organization");
    }
  };

  const handleInputChange = (e) => {
    let orgName = e.target.value;
    setOrgName(orgName);
    setCommits([]);
  };

  const handlePageChange = (e) => {
    // target button to retrieve page number
    let pageBtnNum = e.target.innerHTML;

    // if page button number is equal to the current page # then fetch data
    if (pageBtnNum === pageNum) {
      fetchRepos(pageBtnNum);
    }
  };

  // if window width is less than 1024px, then render Mobile component
  const handleWindowResize = () => {
    window.innerWidth < 1024 ? setResize(true) : setResize(false);
  };

  // useEffect that keeps track of window resizing between renders
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Get Total Repository Count only on the first render
  // makes API Call to retrieve total amount of public repositories
  const getTotalRepoCount = async () => {
    const data = await fetchData(`https://api.github.com/orgs/${orgName}`);

    setTitle(data.name);
    const reposPerPage = 30;
    let numOfPages = Math.round(data.public_repos / reposPerPage);
    setTotalPages(numOfPages);
    setTotalRepos(data.public_repos);
  };

  // Fetch Repos API Call
  const fetchRepos = async (pageNum) => {
    const data = await fetchData(
      `https://api.github.com/orgs/${orgName}/repos?page=${pageNum}`
    );

    console.log("DATA", data);

    if (data === undefined) {
      setData([]);
      setOrgName("");
      setTotalPages(0);
      alert(
        "This organization does not exist. Please enter a valid organization"
      );
    }
    // if public repos exists within organization
    else if (data.length > 0) {
      sortByStars(data);
      getTotalRepoCount();
    }
    // There the organization has no public repositories
    else if (data.length === 0) {
      setData([]);
      setOrgName("");
      setTotalPages(0);
      alert("This organization has no public repositories.");
    }
  };

  // Sorting Repos in Descending Order
  const sortByStars = (data) => {
    // creating a new array to store sorted repos
    let sortedRepos = Object.assign([], data);

    // sort by star count in descending order
    sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    setData(sortedRepos);
  };

  // Fetch a list of recent commits from repo
  const getCommits = async (repo) => {
    const data = await fetchData(
      `https://api.github.com/repos/${orgName}/${repo}/commits?per_page/master`
    );
    console.log("COMMITS", data);
    setCommits(data);
  };

  // useEffect that renders every time we fetch repositories or navigate to diff. page number
  useEffect(() => {
    // Scroll to top of page after render
    scrollableElementRef.current.scrollTo(0, 0);

    // only fetch repos if organization name is entered into input
    if (orgName !== "") {
      fetchRepos(pageNum);
    }
  }, [pageNum]);

  return (
    <>
      <AppContainer>
        {title && totalRepos ? (
          <HeadingContainer>
            <Title className="section-title">
              <h1>{title}</h1>
            </Title>
            <SectionHeading>
              <p className="section-heading">
                Repositories <RepoCount>{totalRepos}</RepoCount>
              </p>
            </SectionHeading>
          </HeadingContainer>
        ) : (
          <HeadingContainer>
            <Title className="section-title">
              <h1>Navigate Repositories</h1>
            </Title>
          </HeadingContainer>
        )}
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Search
              ref={inputRef}
              type="text"
              placeholder="Enter an organization…"
              aria-label="Enter an organization…"
              onChange={handleInputChange}
              value={orgName}
            />
            <SearchIcon>
              <path
                fillRule="evenodd"
                d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path>
            </SearchIcon>
            <Button
              text="Search"
              type="submit"
              onClick={() => {
                inputRef.current.blur();
              }}
            />
          </form>
        </FormContainer>
        <MainContainer>
          <SideBar ref={scrollableElementRef}>
            <ul>
              {data.map((repo, index) => {
                return (
                  <Repository
                    key={index}
                    repo={repo}
                    onClick={() => {
                      getCommits(`${repo.name}`);
                      setSelectedRepo(`${repo.name}`);
                      setShowCommits(true);
                    }}
                    className={
                      selectedRepo === `${repo.name}` ? "active-repo" : null
                    }
                  />
                );
              })}
            </ul>
            <PaginationContainer>
              {Array(totalPages)
                .fill()
                .map((page, index) => {
                  return (
                    <button
                      className={pageNum === index + 1 ? "active-page" : null}
                      key={index}
                      onClick={(e) => {
                        setPageNum(index + 1);
                        handlePageChange(e);
                        setSelectedRepo(null);
                        setCommits([]);
                      }}>
                      {index + 1}
                    </button>
                  );
                })}
            </PaginationContainer>
          </SideBar>
          {!resize ? (
            <CommitContent commits={commits} />
          ) : (
            showCommits &&
            selectedRepo && (
              <MobileCommitContent>
                <div>
                  <Button
                    text="Back"
                    onClick={() => {
                      setShowCommits(false);
                    }}
                  />
                </div>
                <ul>
                  {commits.map((commit, index) => {
                    return <Commit key={index} commit={commit} />;
                  })}
                </ul>
              </MobileCommitContent>
            )
          )}
        </MainContainer>
      </AppContainer>
    </>
  );
}

export default App;
