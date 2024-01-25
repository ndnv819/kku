export function DefaultLoader(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <p style={{ color: 'white' }}>loading...</p>
    </div>
  );
}
