import React from "react";
import styled from "styled-components";
import { Commit } from "./Commit";

const Content = styled.section`
  overflow-y: auto;
  margin-left: 600px;
  padding: 16px 48px;
  width: 600px;
  top: 180px;
  position: fixed;
  bottom: 0;
`;

export const CommitContent = ({ commits }) => {
  return (
    <Content
      children={
        <ul>
          {commits.map((commit) => {
            return <Commit key={commit.node_id} commit={commit} />;
          })}
        </ul>
      }></Content>
  );
};
