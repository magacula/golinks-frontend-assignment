import React from "react";
import styled from "styled-components";
import { formatDate, formatCommitHash } from "../utils";

const CommitItemContainer = styled.div`
  padding-bottom: 0.5rem;
  margin-bottom: 10px;
  box-shadow: rgb(52, 112, 227) -7px 0px 0px;
  border: 2px solid #22262c;
  border-radius: 6px;
  height: 100%;

  &:hover {
    box-shadow: rgb(52, 112, 227) -7px 0px 0px,
      rgb(255 255 255 / 10%) 0px 1px 3px;
    background-color: #171b21;
  }
`;

const Message = styled.div`
  color: #fff;
  padding: 10px;
  font-size: 15px;
  height: 2em; /* height is 2x line-height, so two lines will display */
  overflow: hidden;
  a {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  a:hover {
    color: #58a6ff;
    text-decoration: underline;
  }
`;

const CommitInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px 0 10px;
`;

const CommitCreated = styled.div`
  padding-top: 10px;
  display: flex;

  p {
    font-size: 0.95rem;
    padding-right: 5px;
  }
`;

const Author = styled.p`
  color: #fff;
`;

const CommitHash = styled.div`
  border-radius: 6px;
  border: 1px solid #22262c;
  text-align: center;
  padding: 5px 6px;
  background-color: #31363c;
  overflow: hidden;
`;

export const Commit = ({ commit }) => {
  return (
    <>
      <CommitItemContainer>
        <Message>
          <a href={commit.html_url} target="__blank">
            {commit.commit.message}
          </a>
        </Message>

        <CommitInfo>
          <CommitCreated>
            {commit.author ? (
              <Author>{commit.author.login}</Author>
            ) : (
              <Author>{commit.commit.author.name}</Author>
            )}
            <p>commited on</p>
            <div>{formatDate(commit.commit.author.date)}</div>
          </CommitCreated>

          <CommitHash>{formatCommitHash(commit.sha)}</CommitHash>
        </CommitInfo>
      </CommitItemContainer>
    </>
  );
};
