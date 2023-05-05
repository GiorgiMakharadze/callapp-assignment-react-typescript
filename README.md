# Project Title

## CallApp Data Management System

## Description

This is a data management system built with React and Ant Design. It allows users to view, add, update, and delete data. The system also includes a pie chart that shows the percentage of people in each city.

## Used Technologies

In this build, I used React Node.js, Express.js, TypeScript, Zustand, Ant Design, Axios and etc.

## How to install

Download and run - npm run production-build then npm start.

## Features

### View Data

The main page of the application displays a table of data. Users can search for specific data by entering name or email in the search bar. They can also sort the table by clicking on the column headers.

### Add Data

To add new data, click on the "Add Data" button at the bottom of the table. This will open a modal where users can enter the details for the new data. Click "Ok" to add the data to the table.

### Update Data

To update existing data, double-click on the row for the data that needs to be updated. This will open a modal where users can make changes to the data. Click "Ok" to update the data.

### Delete Data

To delete data, click on the Delete button in the row for the data that needs to be deleted. This will prompt the user to confirm the deletion.

### Pie Chart

The "Go to chart" button at the bottom of the table will take users to a page that displays a pie chart. The chart shows the percentage of people in each city.

## API Reference

### Get all data

```http
  GET /api/v1/data
```

### Create data

```http
  POST /api/v1/data
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `name`    | `string` | **Required**. Your name                               |
| `email`   | `string` | **Required**. Your email                              |
| `gender`  | `string` | **Required**. Your gender male or female              |
| `address` | `string` | **Required**. Your need to write your street and city |
| `phone`   | `string` | **Required**. Your your mobile phone number           |

### Update data

```http
  UPDATE /api/v1/data/{id}
```

You can update any value

### Delete data

```http
  DELETE /api/v1/data/{id}
```
