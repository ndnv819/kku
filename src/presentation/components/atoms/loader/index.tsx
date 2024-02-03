export function DefaultLoader(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
      }}
    >
      <p style={{ color: 'red', fontSize: 30 }}>loading...</p>
    </div>
  );
}
