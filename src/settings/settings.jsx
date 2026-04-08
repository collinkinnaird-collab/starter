import React from 'react';

const AVATARS = [
  '/images/image_1.png',
  '/images/image_2.png',
  '/images/avatar_3.png',
  '/images/avatar_4.png',
  '/images/avatar_5.png',
  '/images/avatar_6.png',
  '/images/avatar_7.png',
  '/images/avatar_8.png',
  '/images/avatar_9.png',
  '/images/avatar_10.png',
  '/images/avatar_11.png',
  '/images/avatar_12.png',
];

export function Settings({ avatar, onAvatarChange }) {
  return (
    <main className="col-12 col-md-10 col-lg-8 mx-auto p-3">
      <div className="card p-4 custom mb-4">
        <h5 className="mb-3">Choose your avatar</h5>
        <div className="d-flex align-items-center gap-3 mb-4">
          <img
            src={avatar || '/images/image_1.png'}
            alt="Current avatar"
            width="80"
            height="80"
            className="rounded-circle"
            style={{ border: '3px solid #17a2b8' }}
          />
          <span className="text-muted">Current avatar</span>
        </div>
        <div className="row g-3">
          {AVATARS.map((src) => (
            <div className="col-4 col-sm-3 col-md-2" key={src}>
              <button
                type="button"
                className="btn p-1 w-100"
                style={{
                  border: avatar === src ? '3px solid #17a2b8' : '3px solid transparent',
                  borderRadius: '50%',
                  background: 'transparent',
                }}
                onClick={() => onAvatarChange(src)}
              >
                <img
                  src={src}
                  alt="avatar option"
                  className="img-fluid rounded-circle"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 custom">
        <p className="mb-0 text-muted">
          "When performance is measured, performance improves. When performance is measured and reported, the rate of improvement accelerates."
          — Thomas S Monson
        </p>
      </div>
    </main>
  );
}
