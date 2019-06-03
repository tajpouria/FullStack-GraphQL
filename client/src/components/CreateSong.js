import React, { useState } from 'react';

export default function () {
  const [title, setTitle] = useState('');

  return (
    <div className="container">
      <form>
        <label htmlFor="title">
          Create New Song:
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </label>
      </form>
    </div>
  );
}
