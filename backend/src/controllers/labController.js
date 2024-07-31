exports.getAllReservations = async (req, res) => {
    console.log("Fetching all reservations");

    const allReservations = {
        0: [
            { date: "2024-01-15", status: "applied" },
            { date: "2024-01-20", status: "full" }
        ],
        1: [
            { date: "2024-02-10", status: "impossible" },
            { date: "2024-02-18", status: "applied" }
        ],
        6: [
            { date: "2024-07-18", status: "applied" },
            { date: "2024-07-19", status: "full" },
            { date: "2024-07-21", status: "impossible" }
        ],
        11: [
            { date: "2024-12-25", status: "applied" },
            { date: "2024-12-31", status: "full" }
        ]
    };

    res.json(allReservations);
};
