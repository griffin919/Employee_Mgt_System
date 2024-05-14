import { defineStore } from "pinia";
import { useMainStore } from "./main";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    uName: null,
    employees: [
      {
        id: 1,
        name: "John Walker",
        department: "IT",
        role: "Jnr Developer",
        profilePicture: "/assets/images/profile-image.jpg",
        idNumber: "GHA28839182732283-7",
        dateOfBirth: "1990-08-12",
        dateEmployed: "2021-08-12",
        address: "12 la bawaleshi",
        region: "Accra",
        idType: "Ghana card",
        email: "John@gmai.com",
        phoneNumber: "050 001 8533",
        firstName: "John",
        lastName: "Walker",
      },
      {
        id: 2,
        name: "Cristian S. Ansah",
        department: "IT",
        role: "Snr Software Engineer",
        profilePicture: "/assets/images/profile-image.jpg",
        idNumber: "GHA28839182732283-7",
        dateOfBirth: "1990-08-12",
        dateEmployed: "2021-08-12",
        address: "12 la bawaleshi",
        region: "Accra",
        idType: "Ghana card",
        email: "Cristian@gmail.com",
        phoneNumber: "050 001 8533",
        firstName: "Cristian",
        lastName: "S. Ansah",
      },
      {
        name: "Raymond Oppong Asare",
        role: "Accountant",
        firstName: "Raymond",
        lastName: "Oppong Asare",
        phoneNumber: "050 001 8533",
        email: "rayopps@gmail.com",
        address: "12 la bawaleshi",
        region: "Accra",
        idType: "Ghana card",
        idNumber: "GHA28839182732283-7",
        department: "Finance",
        role: "Accountant",
        profilePicture: "/assets/images/profile-image.jpg",
        dateEmployed: "2021-08-12",
        dateOfBirth: "1990-08-12",
        id: 3,
      },
    ],

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
  },
});
