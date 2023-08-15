import styled from 'styled-components'

const images = [
'/image1.jpg',
'/image2.jpg',
'/image3.jpg'
];

const Grid = styled.div`
display: flex;

img {
width: 33.33%;
cursor: pointer;
}

@media (max-width: 768px) {
flex-direction: column;

cssimg {
  width: 100%;
}
}
`;

interface GridComponentProps {
images: string[];
}

export const GridComponent = ({ images }: GridComponentProps) => (
{images.map(img => (product))}
);

const Content = styled.div`
  color: var(--color-alt);
  font-size: var(--fs-lge);
`
const Box4Content = () => {
return <Content><Grid><GridComponent images={images} /></Grid>  </Content>
}

export default Box4Content
