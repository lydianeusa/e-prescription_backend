const prescriptions = [
    {
        id: 1,
        medicine_name: "Smecta",
        dosage: "200 mg",
        frequency: "un fois par jour, le matin",
        duration: "5 jours",
        PatientId: 1,
        PhysicianId: 1,
        PharmacyId: 2
    },
    {
        id: 2,
        medicine_name: "Doliprane",
        dosage: "1 ml",
        frequency: "si besoin",
        duration: "",
        PatientId: 3,
        PhysicianId: 1,
        PharmacyId: 3
    },
    {
        id: 3,
        medicine_name: "Prozac",
        dosage: "200 mg",
        frequency: "un fois par jour, le matin",
        duration: "6 mois",
        PatientId: 2,
        PhysicianId: 3,
        PharmacyId: 2
    },
    {
        id: 4,
        medicine_name: "Amoxicilline",
        dosage: "20 g par jour",
        frequency: "matin et soir",
        duration: "7 jours",
        PatientId: 3,
        PhysicianId: 2,
        PharmacyId: 1
    }
]

module.exports = prescriptions;