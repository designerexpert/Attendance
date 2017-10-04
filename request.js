const express = require('express');
const moment = require('moment');
const zoom = require('zoomus')({
  'key': api_key,
  'secret': api_secret
});

const app = express();

//const startDate = moment().format().split('-').join('%2F').slice(0,14);
//console.log(startDate);
let dashboard = {
  type: 2,
  from: '2017-10-04',
  to: '2017-10-04',
}

const getUsers = (group) => {
  console.log('Listing meeting participants...');
  group[0]['participants'].forEach((participant) => {
    if (participant) console.log(participant.user_name);
  })
  console.log('Success');
}

const getDetail = (ids) => {
  console.log('Getting meeting participants...');
  ids.forEach((id) => {
    dashboard = {
      meeting_id: id,
      type: 2
    }
    zoom.dashboard.meeting(dashboard, (res) => {
      if (res.error) console.log('error on getDetail');
      const group = res;
      getUsers([group]);
    })
  })
}

const getMeetings = () => {
  console.log('getting meeting details...');
  zoom.dashboard.meetings(dashboard, (res) => {
    if (res.error) console.log('error');
    let ids = [];
    res.meetings.forEach((meeting) => ids.push(meeting.uuid));
    console.log('Getting details for '+ids.length+' meetings...');
    getDetail(ids);
  })
}

app.get('/', (req, res) => {
  console.log('getting meetings...');
  let cohorts = [];
  getMeetings();
})

app.listen(3000);