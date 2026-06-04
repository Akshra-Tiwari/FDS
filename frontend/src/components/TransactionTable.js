import "./TransactionTable.css";

const TransactionTable = ({
  transactions
}) => {

  return (

    <div className="table-wrapper">

      <div className="table-header">

        <h2>
          Live Transactions
        </h2>

        <span>
          {transactions.length}
          {" "}
          Records
        </span>

      </div>

      <table className="transactions-table">

        <thead>

          <tr>

            <th>#</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Location</th>

            <th>Type</th>

          </tr>

        </thead>

        <tbody>

          {
            transactions.map(
              (
                transaction,
                index
              ) => (

                <tr
                  key={transaction._id}
                >

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    ₹{transaction.amount}
                  </td>

                  <td>

                    <span
                      className={
                        transaction.status === "fraud"
                          ? "status fraud-status"
                          : "status safe-status"
                      }
                    >

                      {transaction.status}

                    </span>

                  </td>

                  <td>
                    {transaction.location}
                  </td>

                  <td>
                    {transaction.type}
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );

};

export default TransactionTable;