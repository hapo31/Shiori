import styled from "styled-components";

type Props = {
  maxWidth: number;
  maxHeight: number;
};

const AutoResizeImage = styled.img`
  display: block;
  object-fit: contain;
  background-color: black;
  width: calc(100% + 1px);
  height: 100%;
  max-width: ${(props: Props) => props.maxWidth}px;
  max-height: ${(props: Props) => props.maxHeight}px;
  -webkit-user-drag: none;
  user-select: none;
`;

export default AutoResizeImage;
