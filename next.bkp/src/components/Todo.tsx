import React from 'react'

export const Todo = ({ message: string }): React.ReactNode => (
  <>
    {process.env.SHOW_TODO === 'true' ? (
      <div
        style={{
          color: 'red',
          position: 'absolute',
          marginBottom: '60px',
          zIndex: '1000',
          backgroundColor: 'hsla(120, 60%, 70%, 0.5)',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <b>TODO:</b> {message}
      </div>
    ) : null}
  </>
)