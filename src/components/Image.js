function Image({ imgLink, imgClassName, name }) {
  return (
    <>
      {imgLink ? (
        <img src={imgLink} alt={`${name} Image`} className={imgClassName} />
      ) : (
        <img
          src={"https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png"}
          alt={`Fallback Image`}
          className={imgClassName}
        />
      )}{" "}
    </>
  );
}

export default Image;
