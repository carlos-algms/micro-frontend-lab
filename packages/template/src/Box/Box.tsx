export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: 'red',
        color: 'white',
        fontSize: '1.5rem',
        lineHeight: '1.7rem',
        margin: '0 auto',
        maxWidth: '50%',
        padding: '1rem',
      }}
    >
      {children}
    </div>
  );
}
