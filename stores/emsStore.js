import { defineStore } from "pinia";
import { useMainStore } from "./main";

export const useEmsStore = defineStore("emsStore", {
  state: () => ({
    loggedInUser: {},
    uName: null,
    employees: null ,
     attendanceLog: [
        {
          employeeId: 1,
          employeeName: "John Walker",
          date: "2023-05-12",
          inTime: "08:30:00",
          outTime: "17:15:00",
          workingHours: 8.75,
          status: "Present",
          lateArrival: false,
          earlyDeparture: false,
          notes: ""
        },
        {
          employeeId: 2,
          employeeName: "Cristian S. Ansah",
          date: "2023-05-12",
          inTime: "09:00:00",
          outTime: "18:00:00",
          workingHours: 9,
          status: "Present",
          lateArrival: true,
          earlyDeparture: false,
          notes: "Arrived late due to traffic"
        },
        {
          employeeId: 3,
          employeeName: "Raymond Oppong Asare",
          date: "2023-05-12",
          inTime: "08:45:00",
          outTime: "17:30:00",
          workingHours: 8.75,
          status: "Present",
          lateArrival: false,
          earlyDeparture: false,
          notes: ""
        },
        {
          employeeId: 1,
          employeeName: "John Walker",
          date: "2023-05-11",
          inTime: "08:25:00",
          outTime: "17:10:00",
          workingHours: 8.75,
          status: "Present",
          lateArrival: false,
          earlyDeparture: false,
          notes: ""
        },
        {
          employeeId: 2,
          employeeName: "Cristian S. Ansah",
          date: "2023-05-11",
          status: "Absent",
          lateArrival: false,
          earlyDeparture: false,
          notes: "Sick leave"
        },
        {
          employeeId: 3,
          employeeName: "Raymond Oppong Asare",
          date: "2023-05-11",
          inTime: "08:40:00",
          outTime: "17:20:00",
          workingHours: 8.67,
          status: "Present",
          lateArrival: false,
          earlyDeparture: false,
          notes: ""
        }
      ],
    employeeDashTab: "requests",
    selectedEmployee: {
        id: "",
        name: "",
        department: "",
        role: "",
        profilePicture: "",
        idNumber: "",
        dateOfBirth: "",
        dateEmployed: "",
        address: "",
        region: "",
        idType: "",
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
    },
  }),

  getters: {
    getEmployees() {
      return this.employees;
    },
  },

  actions: {
    setEmployeeTab(tab) {
      this.employeeDashTab = tab;
    },
    setSelectedEmployee(employee) {
      this.selectedEmployee = employee;
    },
    setUsers(data) {
      this.employees = data;
    },

    appendAdditionalUserData(data) {
      if (!this.employees) {
        return;
      }
      this.employees.forEach((employee) => {
        const uid = employee.userRecord?.uid;
        if (uid) {
          const userData = data[uid];
          if (userData) {
            employee.userData = userData;
          } else {
          }
        } else {
          console.log("employee has no uid");
        }
      });
    }

  },
});