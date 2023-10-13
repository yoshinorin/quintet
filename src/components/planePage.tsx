const PlanePage: React.FunctionComponent<{ title: string, content: string }> = ({ title, content }) => {

  const pageStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    flexDirection: 'column',
  };

  return (
    <>
      <div style={pageStyles}>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </>
  );
};

export default PlanePage;
