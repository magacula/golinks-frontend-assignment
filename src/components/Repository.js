import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate } from "../utils";

const RepoContainer = styled.div`
  height: 100px;
  border: 3px solid #22262c;
  border-radius: 6px;
  margin: 20px auto;
  padding: 1rem;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    transition: transform all 0.3s;
    background-color: #171b21;
  }

  &.active-repo {
    pointer-events: none;
    background-color: #3470e3;
    color: #d7dbdf;
    border: none;
  }
`;

const RepoName = styled.div`
  font-size: 1.25rem;
  color: #58a6ff;

  a {
    color: #58a6ff;
    text-decoration: none;

    &.active-repo {
      color: #ffff;
    }
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  margin: 0.75rem auto;
`;

const RepoInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
`;

const handleColorType = (color) => {
  switch (color) {
    case "Java":
      return "#b07219";
    case "JavaScript":
      return "#f1e05a";
    case "Python":
      return "#3572A5";
    case "HTML":
      return "#00ADD8";
    case "Go":
      return "#e34c26";
    default:
      return "#fff";
  }
};

const LanguageLogo = styled.span`
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-radius: 50%;
  margin-right: 3px;
  background-color: ${({ color }) => handleColorType(color)};
`;

const StarCount = styled.span`
  display: flex;
  align-items: center;
`;

const ForkCount = styled.span`
  display: flex;
  align-items: center;
`;

export const Repository = ({ repo, onClick, className }) => {
  return (
    <>
      <RepoContainer onClick={onClick} className={className}>
        <RepoName>
          <a href={repo.html_url} className={className} target="_blank">
            {repo.name}
          </a>
        </RepoName>
        <Description className={className}>{repo.description}</Description>

        <RepoInfo>
          {repo.language !== null ? (
            <div>
              <LanguageLogo color={repo.language}></LanguageLogo>
              <span>{repo.language}</span>
            </div>
          ) : (
            <span>Not Specified</span>
          )}

          <StarCount>
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="octicon octicon-star">
              <path
                fillRule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
            </svg>
            {repo.stargazers_count}
          </StarCount>
          <ForkCount>
            <svg
              aria-label="fork"
              role="img"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="octicon octicon-repo-forked">
              <path
                fillRule="evenodd"
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            </svg>
            {repo.forks_count}
          </ForkCount>
          <div>Created on {formatDate(repo.created_at)}</div>
        </RepoInfo>
      </RepoContainer>
    </>
  );
};
