import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <div>
        <Link to="/home">
          <button>click me</button>
        </Link>
      </div>
    </div>
  );
}
