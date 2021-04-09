import './GiphyImage.scss';

export const GiphyImage = ({ data, highlight }) => {
  return data ? (
    <div className={`giphy${highlight ? ' highlighted' : ''}`} id={data.id}>
      <img src={data.image_url} alt={data.id} title={data.title} />
      <em>{data.id}</em>
    </div>
  ) : null;
};
