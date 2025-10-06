import React from "react";
import { Link } from "react-router-dom";

function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Thank You!</h2>
      <p className="mb-6 text-center">
        Your submission has been received. We will get back to you shortly.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default ThankYouPage;
