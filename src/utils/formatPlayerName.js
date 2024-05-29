const formatPlayerName = (name) => {
  const [firstName, ...lastName] = name.split(" ");
  return (
    <>
      <span>{firstName}</span>
      <br />
      <span>{lastName.join(" ")}</span>
    </>
  );
};

export default formatPlayerName;
