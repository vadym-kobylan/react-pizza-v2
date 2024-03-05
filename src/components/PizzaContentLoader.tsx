import ContentLoader from 'react-content-loader';

const PizzaContentLoader = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={488}
    viewBox="0 0 280 488"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="124" r="121" />
    <circle cx="143" cy="71" r="3" />
    <rect x="1" y="445" rx="5" ry="5" width="114" height="37" />
    <rect x="159" y="436" rx="30" ry="30" width="121" height="51" />
    <rect x="5" y="332" rx="5" ry="5" width="270" height="88" />
    <rect x="5" y="260" rx="5" ry="5" width="270" height="55" />
  </ContentLoader>
);

export default PizzaContentLoader;
