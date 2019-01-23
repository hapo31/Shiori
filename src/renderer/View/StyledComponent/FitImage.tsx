import styled from "styled-components";

type Props = {
  maxWidth: number;
  maxHeight: number;
};

const FitImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100vw;
  height: 100%;
  max-width: ${(props: Props) => props.maxWidth}px;
  max-height: ${(props: Props) => props.maxHeight}px;
  -webkit-user-drag: none;
  user-select: none;
`;

export default FitImage;
