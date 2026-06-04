import {
  useState
} from "react";

import API from "../services/api";


const ReceiptScanner =
() => {

  const [file, setFile] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const handleUpload =
  async () => {

    try {

      if (!file) {

        alert(
          "Please select a receipt image"
        );

        return;

      }

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "receipt",
        file
      );

      const response =
        await API.post(

          "/receipt/scan",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }

        );

      setResult(
        response.data
      );

    }

    catch (err) {

      console.log(err);

      alert(
        "Receipt scan failed"
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="scanner-card">

      <h2>
        Receipt Scanner
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={handleUpload}
      >

        {
          loading
            ? "Scanning..."
            : "Scan Receipt"
        }

      </button>

      {
        result && (

          <div>

            <p>
              Amount:
              ₹
              {
                result.detectedAmount ||
                "Not detected"
              }
            </p>

            <p>
              Message:
              {
                result.message
              }
            </p>

          </div>

        )
      }

    </div>

  );

};

export default ReceiptScanner;