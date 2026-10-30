// Set this to your deployed backend URL to save answers online.
// Example: const API_BASE = 'https://your-backend.example.com';
const API_BASE = '';
const screens = [...document.querySelectorAll('.screen')];
function showScreen(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>showScreen(btn.dataset.next)));
const questions=[
 {q:'When I said I had fever, what I missed most was…',a:['A little concern','You did show concern','I didn’t know what to say','I want to explain']},
 {q:'Do you miss sharing little daily updates?',a:['Yes, sometimes','I still want to','Things have changed','Let’s talk about it']},
 {q:'When you message and then disappear, I feel…',a:['A little ignored','Maybe you are busy','I should explain','I didn’t realise']},
 {q:'Have you ever felt our friendship becoming distant?',a:['Yes','A little','Not really','I’m not sure']},
 {q:'Can we make a little time for each other sometimes?',a:['Yes, let’s try','When I’m free','I need some space','Let’s discuss']},
 {q:'Do you remember our random calls?',a:['Of course','I miss them too','I’m not a call person now','Let’s find a way']},
 {q:'What matters most in a friendship?',a:['Equal effort','Honesty','Giving space','All of these']},
 {q:'When I said I deleted your number and you said “okay”…',a:['I didn’t understand it hurt','I was unsure what to say','I’m sorry it hurt','Can we talk about it?']}
];
let current=0;const answers=[];const card=document.getElementById('questionCard');
function renderQuestion(){const item=questions[current];card.innerHTML=`<h3>${item.q}</h3><div class="answers">${item.a.map((a,i)=>`<button class="answer" data-answer="${i}">${a}</button>`).join('')}</div>`;card.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>{answers[current]=item.a[Number(btn.dataset.answer)];if(current<questions.length-1){current++;renderQuestion()}else{showScreen('letter')}}));document.getElementById('progressBar').style.width=((current+1)/questions.length*100)+'%';document.getElementById('progressLabel').textContent=`Question ${current+1} of ${questions.length}`;}
renderQuestion();document.getElementById('skipQuestions').addEventListener('click',()=>showScreen('letter'));
document.getElementById('sendReply').addEventListener('click',async()=>{const name=document.getElementById('signatureName').value.trim();const note=document.getElementById('replyNote').value.trim();const status=document.getElementById('saveStatus');if(!name){status.textContent='Please add your name or nickname, or choose Skip.';return;}const payload={name,note,answers,createdAt:new Date().toISOString()};if(!API_BASE){status.textContent='Note ready on this device. Online saving needs the backend URL to be connected.';setTimeout(()=>showScreen('ending'),1300);return;}try{const response=await fetch(`${API_BASE}/api/replies`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error('Save failed');status.textContent='Your acknowledgement was saved. Thank you.';setTimeout(()=>showScreen('ending'),1000);}catch(e){status.textContent='Could not save online right now. You can still continue.';}});
document.getElementById('restart').addEventListener('click',()=>{current=0;answers.length=0;renderQuestion();showScreen('welcome')});
