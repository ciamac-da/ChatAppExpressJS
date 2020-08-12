
const ausgabe = document.querySelector('.ausgabe');
const eingabe = document.querySelector('.eingabe');
const senden  = document.querySelector('.senden');

const fetchJSON = async (query,body)=> {
  let response = await fetch(
    'http://localhost:9922' + query, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  return await response.json();
};

const nachrichtenAbholen = async ()=> {
  let data = await fetchJSON('/message',{});
  datenAusgeben(data.msgs);
};

const datenAusgeben = (msgs)=> {
  ausgabe.innerHTML = '';
  for ( let message of msgs ){
    ausgabe.innerHTML += message + '<br/>';
  }
};

senden.onclick = async e => {
  let message = eingabe.value;
  let data = await fetchJSON(
    '/message', { msg:message, name:'Cia' }
  );
  datenAusgeben(data.msgs);
  eingabe.value = '';
};

setInterval(nachrichtenAbholen,1000);
nachrichtenAbholen();
