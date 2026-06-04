import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import "./Transactions.css";

import TransactionModal from "../components/TransactionModal";

import { CSVLink } from "react-csv";

const Transactions = () => {

  const [
    transactions,
    setTransactions
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [
    selectedTransaction,
    setSelectedTransaction
  ] = useState(null);

  const [sortType, setSortType] =
    useState("latest");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [
    totalTransactions,
    setTotalTransactions
  ] = useState(0);

  const [error, setError] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);


  /* DARK MODE */

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem("theme") === "dark"

    );


  useEffect(() => {

    if(darkMode){

      document.body.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    }

    else{

      document.body.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);


  useEffect(() => {

    fetchTransactions();

  }, [page]);


  const fetchTransactions =
    async () => {

      try {

        setLoading(true);

        setRefreshing(true);

        setError("");

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(

            `/transactions?page=${page}&limit=10`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        setTransactions(

          Array.isArray(
            response.data.transactions
          )

            ? response.data.transactions

            : []

        );

        setTotalPages(
          response.data.totalPages || 1
        );

        setTotalTransactions(
          response.data.totalTransactions || 0
        );

      }

      catch (error) {

        console.log(error);

        setError(

          error.response?.data?.message ||

          "Failed to load transactions"

        );

      }

      finally {

        setLoading(false);

        setRefreshing(false);

      }

    };


  /* FILTER */

  const filteredTransactions =

    transactions.filter(
      (transaction) => {

        const matchesSearch =

          transaction.location
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesFilter =

          filter === "all"
            ? true
            : filter === "high"
            ? transaction.severity === "HIGH"
            : filter === "medium"
            ? transaction.severity === "MEDIUM"
            : filter === "low"
            ? transaction.severity === "LOW"
            : transaction.status === filter;

        return (
          matchesSearch &&
          matchesFilter
        );

      }
    );


  /* SORT */

  const sortedTransactions =

    [...filteredTransactions]

      .sort((a, b) => {

        switch (sortType) {

          case "latest":

            return (
              new Date(b.createdAt) -
              new Date(a.createdAt)
            );

          case "oldest":

            return (
              new Date(a.createdAt) -
              new Date(b.createdAt)
            );

          case "highRisk":

            return (
              b.riskScore -
              a.riskScore
            );

          case "lowRisk":

            return (
              a.riskScore -
              b.riskScore
            );

          case "highAmount":

            return (
              b.amount -
              a.amount
            );

          default:

            return 0;

        }

      });


  /* COUNTS */

  const fraudCount =

    transactions.filter(
      (t) =>
        t.status === "fraud"
    ).length;


  const normalCount =

    transactions.filter(
      (t) =>
        t.status === "normal"
    ).length;


  /* CSV */

  const csvData =

    filteredTransactions.map(
      (transaction) => ({

        Amount:
          transaction.amount,

        Status:
          transaction.status,

        Severity:
          transaction.severity,

        Location:
          transaction.location,

        Type:
          transaction.type,

        RiskScore:
          transaction.riskScore,

        Date:
          new Date(
            transaction.createdAt
          ).toLocaleString()

      })
    );


  return (

    <>

      <Navbar />


      <div
        className={

          `transactions-page ${

            darkMode
              ? "dark"
              : ""

          }`

        }
      >


        {/* HEADER */}

        <div className="transactions-header">

          <div>

            <p className="transactions-tag">

              TRANSACTION MONITORING

            </p>

            <h1 className="transactions-title">

              All Transactions

            </h1>

            <p className="transactions-subtitle">

              Monitor and analyze
              transaction activity
              in real-time

            </p>

          </div>


          <div className="header-actions">


            {/* THEME BUTTON */}

            <button
              className="theme-btn"
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
            >

              {
                darkMode
                  ? "☀ Light"
                  : "🌙 Dark"
              }

            </button>


            {/* EXPORT */}

            <CSVLink
              data={csvData}
              filename="transactions-report.csv"
              className="export-btn"
            >

              Export CSV

            </CSVLink>


            {/* REFRESH */}

            <button
              className="refresh-btn"
              onClick={fetchTransactions}
              disabled={loading}
            >

              {
                refreshing
                  ? "Refreshing..."
                  : "Refresh"
              }

            </button>

          </div>

        </div>


        {/* STATS */}

        <div className="transactions-stats">

          <div className="mini-stat-card">

            <p>Total</p>

            <h2>
              {totalTransactions}
            </h2>

          </div>


          <div className="mini-stat-card danger-mini">

            <p>Fraud</p>

            <h2>
              {fraudCount}
            </h2>

          </div>


          <div className="mini-stat-card success-mini">

            <p>Safe</p>

            <h2>
              {normalCount}
            </h2>

          </div>

        </div>


        {/* FILTERS */}

        <div className="filters-section">

          <input
            type="text"
            placeholder="Search by location..."
            className="transactions-search"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />


          <select
            className="transactions-filter"
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All
            </option>

            <option value="fraud">
              Fraud
            </option>

            <option value="normal">
              Normal
            </option>

            <option value="high">
              HIGH Severity
            </option>

            <option value="medium">
              MEDIUM Severity
            </option>

            <option value="low">
              LOW Severity
            </option>

          </select>


          <select
            className="transactions-filter"
            value={sortType}
            onChange={(e) =>
              setSortType(
                e.target.value
              )
            }
          >

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="highRisk">
              Highest Risk
            </option>

            <option value="lowRisk">
              Lowest Risk
            </option>

            <option value="highAmount">
              Highest Amount
            </option>

          </select>

        </div>


        {/* ERROR */}

        {
          error && (

            <div className="table-empty">

              {error}

            </div>

          )
        }


        {/* TABLE */}

        <div className="transactions-table-box">

          {

            loading ? (

              <div className="table-loading">

                Loading Transactions...

              </div>

            )

            : sortedTransactions.length === 0 ? (

              <div className="table-empty">

                No transactions found.

              </div>

            )

            : (

              <table className="transactions-table">

                <thead>

                  <tr>

                    <th>#</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Risk</th>
                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    sortedTransactions.map(
                      (
                        transaction,
                        index
                      ) => (

                        <tr
                          key={transaction._id}
                          onClick={() =>
                            setSelectedTransaction(
                              transaction
                            )
                          }
                        >

                          <td>

                            {
                              (page - 1) * 10 +
                              index + 1
                            }

                          </td>

                          <td>

                            ₹{transaction.amount}

                          </td>

                          <td>

                            <span
                              className={
                                transaction.status === "fraud"
                                  ? "status-badge fraud-status"
                                  : "status-badge safe-status"
                              }
                            >

                              {transaction.status}

                            </span>

                          </td>

                          <td>

                            <span
                              className={
                                transaction.severity === "HIGH"
                                  ? "risk-high"
                                  : transaction.severity === "MEDIUM"
                                  ? "risk-medium"
                                  : "risk-low"
                              }
                            >

                              {transaction.severity}

                            </span>

                          </td>

                          <td>

                            {transaction.location}

                          </td>

                          <td>

                            {transaction.type}

                          </td>

                          <td>

                            <span
                              className={
                                transaction.riskScore > 70
                                  ? "risk-high"
                                  : transaction.riskScore > 40
                                  ? "risk-medium"
                                  : "risk-low"
                              }
                            >

                              {transaction.riskScore}%

                            </span>

                          </td>

                          <td>

                            {
                              new Date(
                                transaction.createdAt
                              ).toLocaleString()
                            }

                          </td>

                        </tr>

                      )
                    )

                  }

                </tbody>

              </table>

            )

          }

        </div>


        {/* PAGINATION */}

        <div className="pagination">

          <button
            disabled={
              page === 1 ||
              loading
            }
            onClick={() =>
              setPage(page - 1)
            }
          >

            Previous

          </button>


          <span>

            Page {page} of {totalPages}

          </span>


          <button
            disabled={
              page === totalPages ||
              loading
            }
            onClick={() =>
              setPage(page + 1)
            }
          >

            Next

          </button>

        </div>


        {/* MODAL */}

        <TransactionModal
          transaction={
            selectedTransaction
          }
          onClose={() =>
            setSelectedTransaction(
              null
            )
          }
        />

      </div>

    </>

  );

};

export default Transactions;