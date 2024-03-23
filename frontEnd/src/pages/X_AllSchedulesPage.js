import React from 'react';

function AllSchedulesPage() {
  return (
    <div>
      {/* Your all schedules page content here */}
      <h2>(frontEnd Features being worked)</h2>
      <ul>
        <li>the shit they select in classes is weird</li>
        <li>maybe get rid of weekends</li>
        <li>maybe get rid of the numbers on weekdays?</li>
        <li>Handling usage by different timezones</li>
        {/*Ngl rather icky. We'll have to alter what they seeon calendar, alter what they put in, and then display it right, and send it right or something ... prob unnecesssary ngl */}
        <li> synchornize styling</li>
      </ul>
      <h2>(notes)</h2>
      <li>When they send their classes, prob how it looks on wiser cart + how it looks on calendar they submitted</li>
      <ul>
        <li></li>
        
      </ul>
      <h2>(endPoints)</h2>

      ClassFormByManual -> http://localhost:9000/sentClasses>
      <br></br>
      ClassFormByFile -> http://localhost:9000/degreeAudit
      <br></br>
      TimeForm -> http://localhost:9000/sentTimes
      <br></br>
      Z_ContactMeFooter -> https://localhost:9000/sentEmails 
      <br></br>
      I can probably send json payload by military time, 12hour or 24 hour, whole original date object or whatever ... dont think sanitzing it will take too much? think its pretty easy

      <br></br>      <br></br>      <br></br>
      # Untracked files:
#	../node_modules/@types/lodash.memoize/
#	../node_modules/@types/lodash/
#	../node_modules/@wojtekmaj/
#	../node_modules/get-user-locale/
#	../node_modules/lodash.memoize/
#	../node_modules/react-calendar/
#
        

      
    </div>
  );
}

export default AllSchedulesPage;