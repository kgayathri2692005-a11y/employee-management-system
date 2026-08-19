import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/MembershipPlans.css";

function MembershipPlans() {

    const [plans, setPlans] = useState([
        {
            id: 1,
            name: "Basic",
            duration: "1 Month",
            price: "999",
            status: "Active",
            features: [
                "View unlimited profiles",
                "Send interests",
                "Basic profile visibility"
            ]
        },
        {
            id: 2,
            name: "Gold",
            duration: "3 Months",
            price: "1999",
            status: "Active",
            features: [
                "Everything in Basic",
                "Priority profile visibility",
                "Unlimited interests",
                "Advanced search"
            ]
        },
        {
            id: 3,
            name: "Premium",
            duration: "6 Months",
            price: "2999",
            status: "Active",
            features: [
                "Everything in Gold",
                "Featured profile",
                "Priority support",
                "Advanced matchmaking"
            ]
        }
    ]);

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [deletePlan, setDeletePlan] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        price: "",
        features: ""
    });

    const openAddForm = () => {

        setEditingPlan(null);

        setFormData({
            name: "",
            duration: "",
            price: "",
            features: ""
        });

        setShowForm(true);
    };

    const openEditForm = (plan) => {

        setEditingPlan(plan);

        setFormData({
            name: plan.name,
            duration: plan.duration,
            price: plan.price,
            features: plan.features.join("\n")
        });

        setShowForm(true);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const savePlan = () => {

        if (
            !formData.name ||
            !formData.duration ||
            !formData.price ||
            !formData.features
        ) {
            alert("Please fill all fields");
            return;
        }

        const featuresArray = formData.features
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item !== "");

        if (editingPlan) {

            setPlans((currentPlans) =>
                currentPlans.map((plan) =>
                    plan.id === editingPlan.id
                        ? {
                            ...plan,
                            name: formData.name,
                            duration: formData.duration,
                            price: formData.price,
                            features: featuresArray
                        }
                        : plan
                )
            );

        } else {

            const newPlan = {
                id: Date.now(),
                name: formData.name,
                duration: formData.duration,
                price: formData.price,
                status: "Active",
                features: featuresArray
            };

            setPlans([...plans, newPlan]);
        }

        setShowForm(false);
        setEditingPlan(null);
    };

    const toggleStatus = (id) => {

        setPlans((currentPlans) =>
            currentPlans.map((plan) =>
                plan.id === id
                    ? {
                        ...plan,
                        status:
                            plan.status === "Active"
                                ? "Inactive"
                                : "Active"
                    }
                    : plan
            )
        );

        if (selectedPlan && selectedPlan.id === id) {

            setSelectedPlan((current) => ({
                ...current,
                status:
                    current.status === "Active"
                        ? "Inactive"
                        : "Active"
            }));
        }
    };

    const handleDeletePlan = () => {

    if (!deletePlan) return;

    setPlans((currentPlans) =>
        currentPlans.filter(
            (plan) => plan.id !== deletePlan.id
        )
    );

    if (
        selectedPlan &&
        selectedPlan.id === deletePlan.id
    ) {
        setSelectedPlan(null);
    }

    setDeletePlan(null);
};

    return (
        <AdminLayout>

            <div className="membership-plans-page">

                {/* HEADER */}

                <div className="membership-plans-header">

                    <div>
                        <h1>Membership Plans</h1>

                        <p>
                            Manage Niyati Matrimony membership plans and pricing.
                        </p>
                    </div>

                    <button
                        className="add-plan-button"
                        onClick={openAddForm}
                    >
                        + Add New Plan
                    </button>

                </div>


                {/* PLAN GRID */}

                <div className="membership-plans-grid">

                    {plans.map((plan) => (

                        <div
                            className="membership-plan-card"
                            key={plan.id}
                        >

                            <div className="membership-plan-header">

                                <div>

                                    <h2>{plan.name}</h2>

                                    <span>{plan.duration}</span>

                                </div>

                                <span
                                    className={`membership-plan-status ${
                                        plan.status === "Active"
                                            ? "active"
                                            : "inactive"
                                    }`}
                                >
                                    {plan.status}
                                </span>

                            </div>


                            <div className="membership-plan-price">

                                <strong>
                                    ₹{plan.price}
                                </strong>

                                <span>
                                    / {plan.duration}
                                </span>

                            </div>


                            <div className="membership-plan-features">

                                <h3>Features</h3>

                                <ul>

                                    {plan.features.map((feature, index) => (

                                        <li key={index}>
                                            ✓ {feature}
                                        </li>

                                    ))}

                                </ul>

                            </div>


                            <div className="membership-plan-action">

                                <button
                                    onClick={() =>
                                        setSelectedPlan(plan)
                                    }
                                >
                                    View Plan
                                </button>

                                <button
                                    className="edit-plan-btn"
                                    onClick={() =>
                                        openEditForm(plan)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className={`status-plan-btn ${
                                        plan.status === "Active"
                                            ? "deactivate"
                                            : "activate"
                                    }`}
                                    onClick={() =>
                                        toggleStatus(plan.id)
                                    }
                                >
                                    {plan.status === "Active"
                                        ? "Deactivate"
                                        : "Activate"}
                                </button>

                                <button
        className="delete-plan-btn"
        onClick={() => setDeletePlan(plan)}
    >
        Delete
    </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* DETAILS */}

                {selectedPlan && (

                    <div className="membership-plan-details">

                        <div className="membership-plan-details-header">

                            <div>

                                <h2>Plan Details</h2>

                                <p>
                                    Review membership plan information.
                                </p>

                            </div>

                            <button
                                className="membership-plan-close"
                                onClick={() =>
                                    setSelectedPlan(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="membership-plan-details-content">

                            <div className="membership-plan-details-info">

                                <h2>
                                    {selectedPlan.name}
                                </h2>

                                <p>
                                    Duration: {selectedPlan.duration}
                                </p>

                                <p>
                                    Price: ₹{selectedPlan.price}
                                </p>

                                <p>
                                    Status: {selectedPlan.status}
                                </p>

                            </div>


                            <div className="membership-plan-details-features">

                                <h3>Included Features</h3>

                                <ul>

                                    {selectedPlan.features.map((feature, index) => (

                                        <li key={index}>
                                            ✓ {feature}
                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </div>

                    </div>

                )}


                {/* ADD / EDIT FORM */}

                {showForm && (

                    <div className="plan-form-overlay">

                        <div className="plan-form">

                            <div className="plan-form-header">

                                <h2>
                                    {editingPlan
                                        ? "Edit Membership Plan"
                                        : "Add New Membership Plan"}
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            <div className="plan-form-body">

                                <label>
                                    Plan Name
                                </label>

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Basic / Gold / Premium"
                                />


                                <label>
                                    Duration
                                </label>

                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="1 Month"
                                />


                                <label>
                                    Price
                                </label>

                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="999"
                                />


                                <label>
                                    Features
                                </label>

                                <textarea
                                    name="features"
                                    rows="6"
                                    value={formData.features}
                                    onChange={handleChange}
                                    placeholder={`View unlimited profiles
Send interests
Priority support`}
                                />

                            </div>


                            <div className="plan-form-actions">

                                <button
                                    className="cancel-plan"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-plan"
                                    onClick={savePlan}
                                >
                                    {editingPlan
                                        ? "Save Changes"
                                        : "Add Plan"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                                

                {/* DELETE CONFIRMATION */}

                {deletePlan && (

                    <div className="delete-plan-overlay">

                        <div className="delete-plan-modal">

                            <div className="delete-plan-icon">
                                🗑️
                            </div>

                            <h2>
                                Delete Membership Plan?
                            </h2>

                            <p>
                                Are you sure you want to delete
                                <strong> {deletePlan.name} </strong>
                                plan?
                            </p>

                            <span className="delete-plan-warning">
                                This action cannot be undone.
                            </span>

                            <div className="delete-plan-actions">

                                <button
                                    className="cancel-delete-btn"
                                    onClick={() =>
                                        setDeletePlan(null)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="confirm-delete-btn"
                                    onClick={handleDeletePlan}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}

export default MembershipPlans;

          