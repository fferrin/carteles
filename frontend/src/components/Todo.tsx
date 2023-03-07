import React from 'react'

type TodoProps = {
  message: string;
}

export const Todo = ({ message }: TodoProps): React.ReactNode => (
  <>
    {/*{process.env.SHOW_TODO === 'true' ? (*/}
    <div
      style={{
        color: 'red',
        position: 'absolute',
        marginBottom: '60px',
        zIndex: '1000',
        backgroundColor: 'hsla(120, 60%, 70%, 0.85)',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <b>TODO:</b> {message}
    </div>
    {/*) : null}*/}
  </>
)