import "./Admin.css";

import { useEffect, useState, useMemo, useCallback } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";


const Admin = () => {

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [busyId, setBusyId] = useState(null);


  const authConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }), []);


  const loadData = useCallback(async () => {

    try {

      setError("");

      const [usersRes, statsRes] = await Promise.all([
        API.get("/admin/users", authConfig()),
        API.get("/admin/analytics", authConfig())
      ]);

      setUsers(usersRes.data);

      setStats(statsRes.data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Could not load admin data"
      );

    } finally {

      setLoading(false);

    }

  }, [authConfig]);


  useEffect(() => {
    loadData();
  }, [loadData]);


  const toggleFreeze = async (user) => {

    const action = user.isFrozen ? "unfreeze" : "freeze";

    if (!window.confirm(`Are you sure you want to ${action} ${user.email}?`)) {
      return;
    }

    try {

      setBusyId(user._id);

      const res = await API.put(
        `/admin/${action}/${user._id}`,
        {},
        authConfig()
      );

      // update only that row instead of refetching everything
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? res.data.user : u
        )
      );

      toast.success(res.data.message);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        `Failed to ${action} user`
      );

    } finally {

      setBusyId(null);

    }

  };


  const filteredUsers = useMemo(() => {

    const q = search.trim().toLowerCase();

    if (!q) return users;

    return users.filter((u) =>
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );

  }, [users, search]);


  const fraudRate =
    stats && stats.totalTransactions > 0
      ? ((stats.fraudTransactions / stats.totalTransactions) * 100).toFixed(1)
      : "0.0";


  return (

    <>

      <Navbar />

      <div className="admin-page">

        <div className="admin-header">

          <div>

            <div className="admin-tag">ADMIN CONSOLE</div>

            <h1>User Management</h1>

            <p>Monitor platform activity and freeze suspicious accounts.</p>

          </div>

        </div>


        {loading && <p className="admin-state">Loading admin data...</p>}

        {error && (
          <div className="admin-error">
            {error}
            <button onClick={loadData}>Retry</button>
          </div>
        )}


        {stats && (

          <div className="admin-stats">

            <div className="admin-stat-card">
              <span>Total Users</span>
              <strong>{stats.totalUsers}</strong>
            </div>

            <div className="admin-stat-card">
              <span>Total Transactions</span>
              <strong>{stats.totalTransactions}</strong>
            </div>

            <div className="admin-stat-card">
              <span>Fraud Transactions</span>
              <strong className="danger">{stats.fraudTransactions}</strong>
            </div>

            <div className="admin-stat-card">
              <span>Fraud Rate</span>
              <strong>{fraudRate}%</strong>
            </div>

          </div>

        )}


        {!loading && !error && (

          <div className="admin-table-card">

            <input
              className="admin-search"
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="admin-table-wrap">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="admin-empty">
                        No users found
                      </td>
                    </tr>
                  )}

                  {filteredUsers.map((u) => (

                    <tr key={u._id}>

                      <td>{u.name}</td>

                      <td>{u.email}</td>

                      <td>
                        <span className={`badge role-${u.role}`}>
                          {u.role}
                        </span>
                      </td>

                      <td>
                        <span className={u.isFrozen ? "badge frozen" : "badge active"}>
                          {u.isFrozen ? "Frozen" : "Active"}
                        </span>
                      </td>

                      <td>

                        {u.role === "admin" ? (
                          <span className="admin-muted">—</span>
                        ) : (
                          <button
                            className={u.isFrozen ? "admin-btn unfreeze" : "admin-btn freeze"}
                            disabled={busyId === u._id}
                            onClick={() => toggleFreeze(u)}
                          >
                            {busyId === u._id
                              ? "Please wait..."
                              : u.isFrozen ? "Unfreeze" : "Freeze"}
                          </button>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </>

  );

};

export default Admin;
