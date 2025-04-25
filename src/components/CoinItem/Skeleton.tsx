import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={1168}
      height={59}
      viewBox="0 0 1168 59"
      backgroundColor="#26272b"
      foregroundColor="#4a4a4a">
      <rect x="0" y="0" rx="0" ry="0" width="1168" height="59" />
    </ContentLoader>
  );
};

export default Skeleton;
