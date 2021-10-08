import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Repository } from "./components/Repository";
import { ScaleLoader } from "react-spinners";

/* App Styles */
const FormContainer = styled.div`
  margin-top: 25px;
`;

const AppContainer = styled.div`
  margin: 2rem;
`;

const Title = styled.div`
  h1 {
    color: #58a6ff;
    font-weight: 600;
  }
`;

const RepositoryList = styled.ul``;

const CommitList = styled.ul``;

const SideBar = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  bottom: 0;
  overflow-y: auto;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  width: 600px;
  z-index: 5;
  margin: 0;
  padding: 0 40px 40px 0;
  position: fixed;
  top: 100px;

  .section-heading {
    color: #c9d1d9;

    font-weight: 500;
    font-size: 1.25rem;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

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

function App() {
  // const [selectedRepo, setSelectedRepo] = useState(null);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  // const lastRepoRef = useRef(); // ref used to get the last repo component

  /*
  Implement Later:
  const [query, setQuery] = useState("");

  */

  // const handleClick = (e) => {
  //   e.preventDefault();
  // console.log("form submitted");
  //   setSelectedRepo(name);
  //   fetchData();
  // };

  const handleClick = (e) => {
    // target button to retrieve page number
    let pageBtn = e.target.innerHTML;
    fetchRepos(pageBtn);
  };

  const org = "Netflix";

  // Gets Total count of repositories on first render
  useEffect(() => {
    const getTotalRepos = async () => {
      setLoading(true);
      try {
        const url = `https://api.github.com/orgs/${org}`;
        const response = await fetch(url);
        const data = await response.json();

        let totalPages = Math.round(data.public_repos / 30);
        console.log(totalPages);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalRepos();
  }, []);

  const fetchRepos = async (pageNum) => {
    setLoading(true);
    try {
      const url = `https://api.github.com/orgs/${org}/repos?page=${pageNum}`;
      const response = await fetch(url);
      const data = await response.json();

      sortByStars(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByStars = (data) => {
    // creating a new array to store sorted repos
    let sortedRepos = Object.assign([], data);

    // sort by descending order
    sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    setData(sortedRepos);
  };

  useEffect(() => {
    fetchRepos(pageNum);
  }, [pageNum]);

  return (
    <>
      <AppContainer>
        {/* <FormContainer>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter organization name../" />
          <button type="submit">Search</button>
        </form>
      </FormContainer> */}

        <Title className="section-title">
          <h1>{org}'s Repositories</h1>
        </Title>
        <SideBar>
          <p className="section-heading">Repositories</p>
          {loading ? (
            <LoaderContainer>
              <ScaleLoader color={"#58a6ff"} height={25} loading />
            </LoaderContainer>
          ) : (
            <div>
              <RepositoryList>
                {data.map((repo, index) => {
                  return <Repository key={index} repo={repo} />;
                })}
              </RepositoryList>
              <PaginationContainer>
                {console.log(pageNum)}
                {Array(totalPages)
                  .fill()
                  .map((page, index) => {
                    return (
                      <button
                        className={pageNum === index + 1 ? "active-page" : null}
                        key={index}
                        onClick={(e) => {
                          setPageNum(index + 1);
                          handleClick(e);
                        }}>
                        {index + 1}
                      </button>
                    );
                  })}
              </PaginationContainer>
            </div>
          )}
        </SideBar>

        {/* <CommitList>{}</CommitList> */}
      </AppContainer>
    </>
  );
}

export default App;
