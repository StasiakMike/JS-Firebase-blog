//displaying articles
const articlesList = document.querySelector('.articles');
const loggedOutMenu = document.querySelectorAll('.logged-out');
const loggedInMenu = document.querySelectorAll('.logged-in');
const aboutInfo = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

//conditions for user interface: loggedIn or Out
const setupUI = (user) => {
  if(user) {
    if(user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    //account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `<span>You are logged as:${user.email}</span><br><br>
      <span>About you: ${doc.data().bio}</span><br>
      <span class="yellow-text accent-2">${user.admin ? 'Admin status' : ''}</span>`;
      aboutInfo.innerHTML = html;
    })
    
    //UI switch log/non-log
    loggedInMenu.forEach(item => item.style.display = 'block');
    loggedOutMenu.forEach(item => item.style.display = 'none');
  } else {
    adminItems.forEach(item => item.style.display = 'none');
    aboutInfo.innerHTML = '';
    loggedInMenu.forEach(item => item.style.display = 'none');
    loggedOutMenu.forEach(item => item.style.display = 'block');
  }
}


// create articles
const setupArticles = (data) => {
  
  if(data.length) {
  let html = '';
  data.forEach(doc => {
    const article = doc.data();
    //console.log(article)
    const li = `
    <li>
      <div class="collapsible-header lime-text N/A transparent">
        <h6><b>${article.title}</b></h6></div>
      <div class="collapsible-body N/A transparent pink-text">${article.content}</div>
    </li>
    `;
    html += li;
  });

  articlesList.innerHTML = html;
} else {
  articlesList.innerHTML = '<h5 class="center-align red-text"><b>Log in or sign up to see the content</b></5><br><br><span>See About section to learn about app features</span>';
}

}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});