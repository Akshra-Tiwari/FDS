import "./ErrorPage.css";

const ErrorPage = ({ message }) => {

  return (

    <div className="error-page">

      <h1>
        Something went wrong
      </h1>

      <p>
        {message}
      </p>

      <button
        onClick={() =>
          window.location.reload()
        }
      >
        Retry
      </button>

    </div>

  );

};

export default ErrorPage;