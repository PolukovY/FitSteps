# -*- coding: utf-8 -*-
HEAD = open('_head.txt').read()
FIGCSS = open('_fig.txt').read()
FIGSVG = open('_fig_svg.txt').read()
MF = open('_muscle_front.txt').read()
MB = open('_muscle_back.txt').read()
BASE='#232830'; P='#D7F25A'; S='rgba(215,242,90,0.34)'

def front(w,h,**kw):
    d={'BASE':BASE,'DELT':BASE,'CHEST':BASE,'ARM':BASE,'CORE':BASE,'OBL':BASE,'QUAD':BASE,'CALF':BASE}
    d.update(kw); s=MF.replace('__W__',str(w)).replace('__H__',str(h))
    for k,v in d.items(): s=s.replace('__%s__'%k,v)
    return s

def back(w,h,**kw):
    d={'BASE':BASE,'TRAP':BASE,'DELT':BASE,'LAT':BASE,'LOWBACK':BASE,'TRI':BASE,'GLUTE':BASE,'HAM':BASE,'CALF':BASE}
    d.update(kw); s=MB.replace('__W__',str(w)).replace('__H__',str(h))
    for k,v in d.items(): s=s.replace('__%s__'%k,v)
    return s

def page(body, extra_css=''):
    return HEAD + extra_css + body + '\n</x-dc>\n</body>\n</html>\n'

def write(name, body, extra_css=''):
    open(name,'w').write(page(body, extra_css))
    print('wrote', name)

FRAME = 'width: 390px; height: 844px; overflow: hidden; background: #0B0C0F; display: flex; flex-direction: column;'

# ---------- Exercise ----------
seg = ''.join('<div style="height: 4px; border-radius: 2px; background: %s;"></div>' % ('#D7F25A' if i<3 else ('#D7F25A' if i==3 else '#262A32')) for i in range(12))
exercise = u'''
<div style="__FRAME__">
  <div style="padding: 52px 20px 0 20px; display: flex; flex-direction: column; gap: 14px;">
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 4px;">__SEG__</div>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 34px; height: 34px; border-radius: 999px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></div>
        <div style="font-size: 12px; font-weight: 800; color: #8B929C; letter-spacing: 0.08em;">EXERCISE 4 OF 12</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 34px; height: 34px; border-radius: 999px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="1.8" stroke-linejoin="round"><path d="M5 9h3l4-3.5v13L8 15H5z"/><path d="M16 9.5a4 4 0 0 1 0 5"/></svg></div>
        <div style="width: 34px; height: 34px; border-radius: 999px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="1.8" stroke-linecap="round"><path d="M6 5v14M18 5v14M10 12h4"/></svg></div>
      </div>
    </div>
  </div>

  <div style="position: relative; height: 336px; margin: 4px 12px 0 12px; border-radius: 26px; background: radial-gradient(120% 90% at 50% 15%, #1A1F16 0%, #101318 60%); border: 1px solid #1E232B; display: flex; align-items: center; justify-content: center; overflow: hidden;">
    <div style="position: absolute; left: 14px; top: 14px; height: 26px; padding: 0 11px; border-radius: 999px; background: rgba(215,242,90,0.12); display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 11px; font-weight: 800; color: #D7F25A; letter-spacing: 0.06em;">TEMPO 3·1·1</span>
    </div>
    <div style="position: absolute; right: 14px; top: 14px; height: 26px; padding: 0 11px; border-radius: 999px; background: rgba(255,255,255,0.05); display: flex; align-items: center;">
      <span style="font-size: 11px; font-weight: 700; color: #A7AEB8;">Side view</span>
    </div>
__FIG__
  </div>

  <div style="padding: 18px 20px 0 20px; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px;">
    <div style="display: flex; flex-direction: column; gap: 3px;">
      <div class="d" style="font-size: 27px; line-height: 1.05;">Bodyweight<br>Squat</div>
      <div style="font-size: 12px; font-weight: 600; color: #8B929C;">Присідання</div>
    </div>
    <div style="text-align: right;">
      <div class="d" style="font-size: 44px; line-height: 0.9; color: #D7F25A;">8<span style="font-size: 22px; color: #565C66;">/12</span></div>
      <div style="font-size: 11px; font-weight: 800; color: #8B929C; letter-spacing: 0.1em; margin-top: 4px;">REPS</div>
    </div>
  </div>

  <div style="margin: 16px 20px 0 20px; height: 46px; border-radius: 14px; border: 1px solid #3A4426; background: rgba(215,242,90,0.06); display: flex; align-items: center; gap: 10px; padding: 0 14px;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="2" stroke-linecap="round"><path d="M12 3v3M12 18v3M4.2 12H7M17 12h2.8M6.3 6.3l2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2"/></svg>
    <span style="font-size: 14px; font-weight: 700; color: #E6EDBF;">Knees aligned with toes</span>
  </div>

  <div style="margin: 14px 20px 0 20px; flex-grow: 1; border-radius: 20px; background: #14161B; border: 1px solid #1E222A; padding: 14px 16px; display: flex; gap: 16px; align-items: center;">
    <div style="display: flex; gap: 8px; flex-shrink: 0;">__MF____MB__</div>
    <div style="display: flex; flex-direction: column; gap: 10px; flex-grow: 1;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div style="font-size: 10px; font-weight: 800; color: #D7F25A; letter-spacing: 0.1em;">PRIMARY</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          <span style="height: 24px; padding: 0 10px; border-radius: 999px; background: #D7F25A; color: #10130A; font-size: 11px; font-weight: 800; display: flex; align-items: center;">Quadriceps</span>
          <span style="height: 24px; padding: 0 10px; border-radius: 999px; background: #D7F25A; color: #10130A; font-size: 11px; font-weight: 800; display: flex; align-items: center;">Glutes</span>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">SECONDARY</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          <span style="height: 24px; padding: 0 10px; border-radius: 999px; border: 1px solid #3A4426; color: #A9B383; font-size: 11px; font-weight: 700; display: flex; align-items: center;">Hamstrings</span>
          <span style="height: 24px; padding: 0 10px; border-radius: 999px; border: 1px solid #3A4426; color: #A9B383; font-size: 11px; font-weight: 700; display: flex; align-items: center;">Core</span>
        </div>
      </div>
    </div>
  </div>

  <div style="padding: 14px 20px 26px 20px; display: flex; flex-direction: column; gap: 10px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 54px; height: 54px; border-radius: 16px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></div>
      <div style="flex-grow: 1; height: 54px; border-radius: 16px; background: #D7F25A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #10130A; letter-spacing: 0.08em;">Done</span></div>
      <div style="width: 54px; height: 54px; border-radius: 16px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 18px;">
      <span style="font-size: 12px; font-weight: 700; color: #8B929C;">Too difficult? <span style="color: #D7F25A;">Easier version</span></span>
      <span style="width: 3px; height: 3px; border-radius: 999px; background: #3A414C;"></span>
      <span style="font-size: 12px; font-weight: 700; color: #8B929C;">Replace</span>
    </div>
  </div>
</div>
'''
exercise = (exercise.replace('__FRAME__', FRAME).replace('__SEG__', seg).replace('__FIG__', FIGSVG)
    .replace('__MF__', front(62, 119, QUAD=P, CORE=S, OBL=S))
    .replace('__MB__', back(62, 119, GLUTE=P, HAM=S)))
write('Exercise.dc.html', exercise, FIGCSS)

# ---------- Workout intro ----------
rows = [('Arm Circles','WARM-UP','30 sec'),('Jumping Jacks','WARM-UP','40 sec'),
        ('Bodyweight Squat','12 reps','3·1·1'),('Push-ups','10 reps','2·0·1'),
        ('Reverse Lunge','10 each side','—'),('Plank','40 sec','hold')]
li = ''
for i,(n,a,b) in enumerate(rows):
    warm = a == 'WARM-UP'
    li += u'''<div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #191C23;">
      <div style="width: 44px; height: 44px; border-radius: 13px; background: %s; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <span class="d" style="font-size: 15px; color: %s;">%d</span></div>
      <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px;">
        <span style="font-size: 14px; font-weight: 700; color: #E7EBF0;">%s</span>
        <span style="font-size: 11px; font-weight: 700; color: %s; letter-spacing: %s;">%s</span>
      </div>
      <span style="font-size: 12px; font-weight: 700; color: #6D747E;">%s</span>
    </div>''' % ('rgba(215,242,90,0.10)' if warm else '#191C22',
                 '#D7F25A' if warm else '#8B929C', i+1, n,
                 '#D7F25A' if warm else '#8B929C', '0.08em' if warm else '0', a, b)

intro = u'''
<div style="__FRAME__">
  <div style="position: relative; height: 300px; flex-shrink: 0; background: radial-gradient(110% 80% at 70% 10%, #212814 0%, #0B0C0F 68%); border-bottom: 1px solid #1B1F26; padding: 52px 20px 0 20px; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E7EBF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></div>
    <div style="position: absolute; right: 10px; top: 68px; opacity: 0.9;">__MF__</div>
    <div style="padding-bottom: 22px; display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; gap: 6px;">
        <span style="height: 24px; padding: 0 10px; border-radius: 999px; background: rgba(215,242,90,0.14); color: #D7F25A; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; display: flex; align-items: center;">INTERMEDIATE</span>
        <span style="height: 24px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,0.06); color: #A7AEB8; font-size: 11px; font-weight: 700; display: flex; align-items: center;">Full Body</span>
      </div>
      <div class="d" style="font-size: 34px; line-height: 1;">Full Body<br>Starter</div>
      <div style="font-size: 13px; font-weight: 600; color: #8B929C;">Week 2 · Day 3 of the program</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; padding: 16px 20px 0 20px;">
    <div style="height: 74px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;"><span class="d" style="font-size: 22px;">18</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">MINUTES</span></div>
    <div style="height: 74px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;"><span class="d" style="font-size: 22px;">12</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">EXERCISES</span></div>
    <div style="height: 74px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;"><span class="d" style="font-size: 22px;">156</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">EST. KCAL</span></div>
  </div>

  <div style="padding: 18px 20px 0 20px; display: flex; align-items: center; justify-content: space-between;">
    <div class="d" style="font-size: 15px; color: #C8CED6; letter-spacing: 0.08em;">Exercises</div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 12px; font-weight: 700; color: #8B929C;">Warm-up</span>
      <div style="width: 38px; height: 22px; border-radius: 999px; background: #D7F25A; display: flex; align-items: center; justify-content: flex-end; padding: 3px;"><div style="width: 16px; height: 16px; border-radius: 999px; background: #10130A;"></div></div>
    </div>
  </div>

  <div style="flex-grow: 1; overflow: hidden; padding: 4px 20px 0 20px;">__LIST__</div>

  <div style="padding: 12px 20px 26px 20px; background: linear-gradient(180deg, rgba(11,12,15,0) 0%, #0B0C0F 40%);">
    <div style="height: 56px; border-radius: 16px; background: #D7F25A; display: flex; align-items: center; justify-content: center; gap: 8px;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#10130A"><path d="M8 5.5v13l11-6.5z"/></svg>
      <span class="d" style="font-size: 18px; color: #10130A; letter-spacing: 0.06em;">Start Workout</span>
    </div>
  </div>
</div>
'''
intro = (intro.replace('__FRAME__', FRAME).replace('__LIST__', li)
    .replace('__MF__', front(120, 230, QUAD=P, CHEST=P, CORE=S, DELT=S, ARM=S)))
write('WorkoutIntro.dc.html', intro)

# ---------- Rest ----------
rest = u'''
<div style="__FRAME__ background: radial-gradient(110% 60% at 50% 0%, #101820 0%, #0B0C0F 60%);">
  <div style="padding: 52px 20px 0 20px; display: flex; align-items: center; justify-content: space-between;">
    <div style="font-size: 12px; font-weight: 800; color: #8B929C; letter-spacing: 0.08em;">EXERCISE 5 OF 12</div>
    <div style="font-size: 12px; font-weight: 700; color: #6D747E;">12:04 left</div>
  </div>

  <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding-bottom: 8px;">
    <div class="d" style="font-size: 15px; color: #7FA8C9; letter-spacing: 0.34em; margin-bottom: 4px;">Rest</div>
    <div style="position: relative; width: 232px; height: 232px; display: flex; align-items: center; justify-content: center;">
      <svg width="232" height="232" viewBox="0 0 232 232" fill="none" style="position: absolute; inset: 0; transform: rotate(-90deg);">
        <circle cx="116" cy="116" r="104" stroke="#1B2129" stroke-width="10"/>
        <circle cx="116" cy="116" r="104" stroke="#5FA8E0" stroke-width="10" stroke-linecap="round" stroke-dasharray="653" stroke-dashoffset="196"/>
      </svg>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div class="d" style="font-size: 66px; line-height: 1; color: #F2F4F7;">00:28</div>
        <div style="font-size: 11px; font-weight: 800; color: #6D747E; letter-spacing: 0.14em; margin-top: 6px;">GET READY</div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 22px;">
      <div style="height: 46px; padding: 0 20px; border-radius: 14px; border: 1px solid #2A303A; display: flex; align-items: center; gap: 7px;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="2" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>
        <span style="font-size: 14px; font-weight: 800; color: #E7EBF0;">10 sec</span>
      </div>
      <div style="height: 46px; padding: 0 20px; border-radius: 14px; background: #1D242C; display: flex; align-items: center; gap: 7px;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9FC9EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5l9 7-9 7zM18 5v14"/></svg>
        <span style="font-size: 14px; font-weight: 800; color: #9FC9EA;">Skip rest</span>
      </div>
    </div>
  </div>

  <div style="margin: 0 16px 30px 16px; border-radius: 22px; background: #13161B; border: 1px solid #1E222A; padding: 14px; display: flex; align-items: center; gap: 14px;">
    <div style="width: 104px; height: 104px; border-radius: 16px; background: #0F1216; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;">
__FIGSMALL__
    </div>
    <div style="display: flex; flex-direction: column; gap: 7px; flex-grow: 1;">
      <span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.14em;">NEXT UP</span>
      <span class="d" style="font-size: 21px; line-height: 1;">Push-ups</span>
      <span style="font-size: 12px; font-weight: 600; color: #8B929C;">10 reps · Chest, Triceps</span>
      <div style="display: flex; gap: 6px; margin-top: 2px;">
        <span style="height: 22px; padding: 0 9px; border-radius: 999px; background: rgba(215,242,90,0.12); color: #D7F25A; font-size: 10px; font-weight: 800; display: flex; align-items: center;">PREVIEW</span>
        <span style="height: 22px; padding: 0 9px; border-radius: 999px; border: 1px solid #2A303A; color: #8B929C; font-size: 10px; font-weight: 700; display: flex; align-items: center;">Replace</span>
      </div>
    </div>
  </div>
</div>
'''
figsmall = FIGSVG.replace('width="270" height="354"', 'width="96" height="126"')
write('Rest.dc.html', rest.replace('__FRAME__', FRAME).replace('__FIGSMALL__', figsmall), FIGCSS)

# ---------- Countdown ----------
cd_css = u'''
  <style>
    .cd .ring { transform-box: view-box; transform-origin: 130px 130px; animation: cdring 1s linear infinite; }
    .cd .num  { animation: cdnum 1s ease-out infinite; }
    @keyframes cdring { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 691; } }
    @keyframes cdnum  { 0% { transform: scale(1.35); opacity: 0; } 18% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
  </style>
'''
countdown = u'''
<div style="__FRAME__ background: radial-gradient(90% 55% at 50% 38%, #1F2716 0%, #0B0C0F 62%); align-items: center;">
  <div style="width: 100%; padding: 52px 20px 0 20px; display: flex; align-items: center; justify-content: space-between;">
    <div style="font-size: 12px; font-weight: 800; color: #8B929C; letter-spacing: 0.08em;">EXERCISE 5 OF 12</div>
    <div style="width: 34px; height: 34px; border-radius: 999px; background: #16191F; display: flex; align-items: center; justify-content: center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8CED6" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></div>
  </div>

  <div class="cd" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px;">
    <div style="position: relative; width: 260px; height: 260px; display: flex; align-items: center; justify-content: center;">
      <svg width="260" height="260" viewBox="0 0 260 260" fill="none" style="position: absolute; inset: 0; transform: rotate(-90deg);">
        <circle cx="130" cy="130" r="110" stroke="#1C2118" stroke-width="6"/>
        <circle class="ring" cx="130" cy="130" r="110" stroke="#D7F25A" stroke-width="6" stroke-linecap="round" stroke-dasharray="691"/>
      </svg>
      <div class="num d" style="font-size: 150px; line-height: 1; color: #D7F25A;">3</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div style="font-size: 11px; font-weight: 800; color: #6D747E; letter-spacing: 0.16em;">GET READY</div>
      <div class="d" style="font-size: 30px;">Push-ups</div>
      <div style="font-size: 14px; font-weight: 700; color: #A7AEB8;">10 reps · Tempo 2·0·1</div>
    </div>
  </div>

  <div style="width: 100%; padding: 0 20px 34px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="1.8" stroke-linejoin="round"><path d="M5 9h3l4-3.5v13L8 15H5z"/><path d="M16 9.5a4 4 0 0 1 0 5"/></svg>
      <span style="font-size: 13px; font-weight: 600; color: #8B929C;">&#8220;Next exercise: Push-ups. Ten reps.&#8221;</span>
    </div>
    <div style="width: 100%; height: 50px; border-radius: 15px; border: 1px solid #2A303A; display: flex; align-items: center; justify-content: center;"><span style="font-size: 14px; font-weight: 800; color: #C8CED6;">Skip countdown</span></div>
  </div>
</div>
'''
write('Countdown.dc.html', countdown.replace('__FRAME__', FRAME), cd_css)

# ---------- Complete ----------
complete = u'''
<div style="__FRAME__ background: radial-gradient(100% 50% at 50% 0%, #232B15 0%, #0B0C0F 58%);">
  <div style="padding: 62px 20px 0 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
      <circle cx="31" cy="31" r="30" fill="rgba(215,242,90,0.12)"/>
      <circle cx="31" cy="31" r="23" fill="#D7F25A"/>
      <path d="M21 31.5 28 38.5 42 24" stroke="#10130A" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
      <div class="d" style="font-size: 34px; line-height: 1;">Workout complete</div>
      <div style="font-size: 14px; font-weight: 600; color: #8B929C;">Full Body Starter · Week 2 · Day 3</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; padding: 24px 20px 0 20px;">
    <div style="height: 82px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;"><span class="d" style="font-size: 24px; color: #D7F25A;">17:42</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">DURATION</span></div>
    <div style="height: 82px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;"><span class="d" style="font-size: 24px;">12</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">EXERCISES</span></div>
    <div style="height: 82px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;"><span class="d" style="font-size: 24px;">156</span><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">KCAL</span></div>
  </div>

  <div style="margin: 12px 20px 0 20px; height: 62px; border-radius: 18px; background: linear-gradient(90deg, rgba(255,122,69,0.14), rgba(255,122,69,0.04)); border: 1px solid #3A2318; display: flex; align-items: center; gap: 12px; padding: 0 16px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7A45" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-1.5.7-2.8 1.7-4 .2 1.2.8 2 1.8 2.4C10.2 8 10.6 5.4 12 3z"/></svg>
    <div style="display: flex; flex-direction: column;">
      <span class="d" style="font-size: 20px; color: #FF9166;">5 day streak</span>
      <span style="font-size: 11px; font-weight: 600; color: #9A7E70;">Longest: 12 days</span>
    </div>
  </div>

  <div style="margin: 14px 20px 0 20px; border-radius: 20px; background: #14161B; border: 1px solid #1E222A; padding: 14px 16px; display: flex; align-items: center; gap: 16px;">
    <div style="display: flex; gap: 6px;">__MF____MB__</div>
    <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 9px;">
      <span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.12em;">MUSCLES TRAINED</span>
      <div style="display: flex; flex-direction: column; gap: 7px;">
        <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 46px; font-size: 11px; font-weight: 700; color: #A7AEB8;">Legs</span><div style="flex-grow: 1; height: 6px; border-radius: 3px; background: #1E222A;"><div style="width: 92%; height: 6px; border-radius: 3px; background: #D7F25A;"></div></div></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 46px; font-size: 11px; font-weight: 700; color: #A7AEB8;">Core</span><div style="flex-grow: 1; height: 6px; border-radius: 3px; background: #1E222A;"><div style="width: 70%; height: 6px; border-radius: 3px; background: #D7F25A;"></div></div></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 46px; font-size: 11px; font-weight: 700; color: #A7AEB8;">Chest</span><div style="flex-grow: 1; height: 6px; border-radius: 3px; background: #1E222A;"><div style="width: 48%; height: 6px; border-radius: 3px; background: rgba(215,242,90,0.5);"></div></div></div>
      </div>
    </div>
  </div>

  <div style="flex-grow: 1; padding: 16px 20px 0 20px; display: flex; flex-direction: column; gap: 10px;">
    <span style="font-size: 13px; font-weight: 700; color: #C8CED6;">How did it feel?</span>
    <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px;">
      <div style="height: 48px; border-radius: 14px; background: #14161B; border: 1px solid #1E222A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #6D747E;">1</span></div>
      <div style="height: 48px; border-radius: 14px; background: #14161B; border: 1px solid #1E222A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #6D747E;">2</span></div>
      <div style="height: 48px; border-radius: 14px; background: #14161B; border: 1px solid #1E222A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #6D747E;">3</span></div>
      <div style="height: 48px; border-radius: 14px; background: #D7F25A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #10130A;">4</span></div>
      <div style="height: 48px; border-radius: 14px; background: #14161B; border: 1px solid #1E222A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #6D747E;">5</span></div>
    </div>
    <div style="display: flex; justify-content: space-between;"><span style="font-size: 10px; font-weight: 700; color: #565C66;">Very easy</span><span style="font-size: 10px; font-weight: 700; color: #565C66;">Very hard</span></div>
  </div>

  <div style="padding: 0 20px 28px 20px;">
    <div style="height: 56px; border-radius: 16px; background: #D7F25A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 18px; color: #10130A; letter-spacing: 0.08em;">Finish</span></div>
  </div>
</div>
'''
complete = (complete.replace('__FRAME__', FRAME)
    .replace('__MF__', front(52, 100, QUAD=P, CHEST=S, CORE=P))
    .replace('__MB__', back(52, 100, GLUTE=P, HAM=S, TRI=S)))
write('Complete.dc.html', complete)

# ---------- Library ----------
libitems = [('Bodyweight Squat','Присідання','Legs · Glutes','Beginner','QUAD'),
            ('Push-ups','Віджимання','Chest · Triceps','Intermediate','CHEST'),
            ('Plank','Планка','Core','Beginner','CORE'),
            ('Reverse Lunge','Зворотний випад','Legs · Glutes','Beginner','QUAD'),
            ('Mountain Climbers','Скелелаз','Core · Cardio','Intermediate','CORE'),
            ('Diamond Push-ups','Алмазні віджимання','Triceps · Chest','Advanced','CHEST')]
lrows = ''
for n, ua, m, diff, part in libitems:
    col = {'Beginner': '#D7F25A', 'Intermediate': '#7FC7E8', 'Advanced': '#FF7A45'}[diff]
    thumb = front(40, 77, **{part: P})
    lrows += u'''<div style="display: flex; align-items: center; gap: 13px; padding: 11px; border-radius: 18px; background: #14161B; border: 1px solid #1C2027;">
      <div style="width: 56px; height: 56px; border-radius: 14px; background: #0F1216; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;">%s</div>
      <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 3px;">
        <span style="font-size: 14px; font-weight: 700; color: #E7EBF0;">%s</span>
        <span style="font-size: 11px; font-weight: 600; color: #6D747E;">%s</span>
        <span style="font-size: 11px; font-weight: 600; color: #8B929C;">%s</span>
      </div>
      <span style="height: 22px; padding: 0 9px; border-radius: 999px; border: 1px solid %s; color: %s; font-size: 10px; font-weight: 800; display: flex; align-items: center;">%s</span>
    </div>''' % (thumb, n, ua, m, col, col, diff.upper())

chips = ''
for i, c in enumerate(['All', 'Legs', 'Core', 'Chest', 'Back', 'Arms', 'Glutes']):
    on = i == 0
    chips += u'<span style="height: 32px; padding: 0 14px; border-radius: 999px; background: %s; color: %s; font-size: 12px; font-weight: 800; display: flex; align-items: center; flex-shrink: 0;">%s</span>' % (
        '#D7F25A' if on else '#14161B', '#10130A' if on else '#A7AEB8', c)

library = u'''
<div style="__FRAME__">
  <div style="padding: 52px 20px 0 20px; display: flex; flex-direction: column; gap: 14px;">
    <div style="display: flex; align-items: baseline; justify-content: space-between;">
      <div class="d" style="font-size: 28px;">Exercise library</div>
      <span style="font-size: 12px; font-weight: 700; color: #6D747E;">54</span>
    </div>
    <div style="height: 46px; border-radius: 14px; background: #14161B; border: 1px solid #1E222A; display: flex; align-items: center; gap: 10px; padding: 0 14px;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>
      <span style="font-size: 14px; font-weight: 600; color: #565C66;">Search exercises</span>
    </div>
    <div style="display: flex; gap: 8px; overflow: hidden;">__CHIPS__</div>
    <div style="display: flex; gap: 8px;">
      <span style="height: 30px; padding: 0 12px; border-radius: 10px; border: 1px solid #23272F; color: #A7AEB8; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px;">Difficulty <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
      <span style="height: 30px; padding: 0 12px; border-radius: 10px; border: 1px solid #23272F; color: #A7AEB8; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px;">Type <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
      <span style="height: 30px; padding: 0 12px; border-radius: 10px; border: 1px solid #3A4426; background: rgba(215,242,90,0.08); color: #D7F25A; font-size: 11px; font-weight: 800; display: flex; align-items: center;">No equipment</span>
    </div>
  </div>

  <div style="flex-grow: 1; overflow: hidden; padding: 16px 20px 0 20px; display: flex; flex-direction: column; gap: 9px;">__ROWS__</div>

  <div style="height: 82px; flex-shrink: 0; border-top: 1px solid #1A1D24; background: #101216; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 10px 8px 0 8px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linejoin="round"><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Home</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Programs</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="1.9" stroke-linecap="round"><path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8"/></svg><span style="font-size: 10px; font-weight: 700; color: #D7F25A;">Library</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linecap="round"><path d="M5 19V9M12 19V5M19 19v-6"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Progress</span></div>
  </div>
</div>
'''
write('Library.dc.html', library.replace('__FRAME__', FRAME).replace('__CHIPS__', chips).replace('__ROWS__', lrows))

# ---------- Exercise detail ----------
mistakes = ['Knees collapsing inward', 'Rounded lower back', 'Heels lifting off the floor', 'Dropping too fast']
mrows = ''.join(u'''<div style="display: flex; align-items: center; gap: 10px;">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF7A45" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M9 9l6 6M15 9l-6 6"/></svg>
  <span style="font-size: 13px; font-weight: 600; color: #B7BEC7;">%s</span></div>''' % m for m in mistakes)

detail = u'''
<div style="__FRAME__">
  <div style="position: relative; height: 300px; flex-shrink: 0; background: radial-gradient(110% 85% at 50% 20%, #1A2016 0%, #0D0F13 65%); border-bottom: 1px solid #1B1F26; display: flex; align-items: center; justify-content: center;">
    <div style="position: absolute; left: 20px; top: 52px; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E7EBF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></div>
    <div style="position: absolute; right: 20px; top: 52px; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E7EBF0" stroke-width="1.9" stroke-linejoin="round"><path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.5 12 20 12 20z"/></svg></div>
    <div style="margin-top: 26px;">__FIGMID__</div>
  </div>

  <div style="flex-grow: 1; overflow: hidden; padding: 18px 20px 0 20px; display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 10px;">
      <div style="display: flex; flex-direction: column; gap: 3px;">
        <div class="d" style="font-size: 26px; line-height: 1.05;">Bodyweight Squat</div>
        <div style="font-size: 12px; font-weight: 600; color: #8B929C;">Присідання · Strength · No equipment</div>
      </div>
      <span style="height: 24px; padding: 0 10px; border-radius: 999px; border: 1px solid #D7F25A; color: #D7F25A; font-size: 10px; font-weight: 800; display: flex; align-items: center; flex-shrink: 0;">BEGINNER</span>
    </div>

    <div style="border-radius: 20px; background: #14161B; border: 1px solid #1E222A; padding: 14px 16px; display: flex; gap: 16px; align-items: center;">
      <div style="display: flex; gap: 8px;">__MF____MB__</div>
      <div style="display: flex; flex-direction: column; gap: 10px; flex-grow: 1;">
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <span style="font-size: 10px; font-weight: 800; color: #D7F25A; letter-spacing: 0.1em;">PRIMARY</span>
          <span style="font-size: 13px; font-weight: 700; color: #E7EBF0;">Quadriceps · Glutes</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">SECONDARY</span>
          <span style="font-size: 13px; font-weight: 700; color: #8B929C;">Hamstrings · Core</span>
        </div>
        <div style="display: flex; gap: 6px; margin-top: 2px;">
          <span style="height: 22px; padding: 0 9px; border-radius: 8px; background: #191C22; color: #A7AEB8; font-size: 10px; font-weight: 800; display: flex; align-items: center;">TEMPO 3·1·1</span>
          <span style="height: 22px; padding: 0 9px; border-radius: 8px; background: #191C22; color: #A7AEB8; font-size: 10px; font-weight: 800; display: flex; align-items: center;">12 REPS</span>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 20px; border-bottom: 1px solid #1B1F26; padding-bottom: 10px;">
      <span class="d" style="font-size: 14px; color: #D7F25A; letter-spacing: 0.06em;">How to</span>
      <span class="d" style="font-size: 14px; color: #6D747E; letter-spacing: 0.06em;">Mistakes</span>
      <span class="d" style="font-size: 14px; color: #6D747E; letter-spacing: 0.06em;">Variations</span>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; gap: 11px;">
        <div style="width: 24px; height: 24px; border-radius: 8px; background: rgba(215,242,90,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><span class="d" style="font-size: 12px; color: #D7F25A;">1</span></div>
        <div style="display: flex; flex-direction: column; gap: 2px;"><span style="font-size: 13px; font-weight: 800; color: #E7EBF0;">Starting position</span><span style="font-size: 13px; font-weight: 500; color: #8B929C; line-height: 1.45; text-wrap: pretty;">Feet shoulder-width apart, toes slightly out, chest up, core braced.</span></div>
      </div>
      <div style="display: flex; gap: 11px;">
        <div style="width: 24px; height: 24px; border-radius: 8px; background: rgba(215,242,90,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><span class="d" style="font-size: 12px; color: #D7F25A;">2</span></div>
        <div style="display: flex; flex-direction: column; gap: 2px;"><span style="font-size: 13px; font-weight: 800; color: #E7EBF0;">Movement</span><span style="font-size: 13px; font-weight: 500; color: #8B929C; line-height: 1.45; text-wrap: pretty;">Push hips back and bend knees until thighs reach parallel. Drive through mid-foot to stand.</span></div>
      </div>
      <div style="display: flex; gap: 11px;">
        <div style="width: 24px; height: 24px; border-radius: 8px; background: rgba(215,242,90,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v16M6 10l6-6 6 6"/></svg></div>
        <div style="display: flex; flex-direction: column; gap: 2px;"><span style="font-size: 13px; font-weight: 800; color: #E7EBF0;">Breathing</span><span style="font-size: 13px; font-weight: 500; color: #8B929C; line-height: 1.45;">Inhale while lowering, exhale while standing up.</span></div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 9px;">
      <span class="d" style="font-size: 13px; color: #C8CED6; letter-spacing: 0.08em;">Common mistakes</span>
      __MISTAKES__
    </div>

    <div style="display: flex; gap: 10px;">
      <div style="flex-grow: 1; height: 62px; border-radius: 16px; background: #14161B; border: 1px solid #1E222A; padding: 0 14px; display: flex; flex-direction: column; justify-content: center; gap: 3px;"><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">EASIER</span><span style="font-size: 13px; font-weight: 700; color: #E7EBF0;">Chair Squat</span></div>
      <div style="flex-grow: 1; height: 62px; border-radius: 16px; background: #14161B; border: 1px solid #1E222A; padding: 0 14px; display: flex; flex-direction: column; justify-content: center; gap: 3px;"><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">HARDER</span><span style="font-size: 13px; font-weight: 700; color: #E7EBF0;">Jump Squat</span></div>
    </div>
  </div>

  <div style="padding: 12px 20px 26px 20px; background: linear-gradient(180deg, rgba(11,12,15,0) 0%, #0B0C0F 45%);">
    <div style="height: 54px; border-radius: 16px; background: #D7F25A; display: flex; align-items: center; justify-content: center;"><span class="d" style="font-size: 17px; color: #10130A; letter-spacing: 0.08em;">Try exercise</span></div>
  </div>
</div>
'''
detail = (detail.replace('__FRAME__', FRAME).replace('__MISTAKES__', mrows)
    .replace('__FIGMID__', FIGSVG.replace('width="270" height="354"', 'width="196" height="257"'))
    .replace('__MF__', front(56, 108, QUAD=P, CORE=S, OBL=S))
    .replace('__MB__', back(56, 108, GLUTE=P, HAM=S)))
write('ExerciseDetail.dc.html', detail, FIGCSS)

# ---------- Programs ----------
progs = [('Beginner Start','14 days','Build the habit','5','#D7F25A',36),
         ('Strong Core','21 days','Abs · Core · Lower back','7','#7FC7E8',0),
         ('Home Strength','4 weeks · 3/week','No equipment','12','#FF7A45',0),
         ('7 Minute Daily','Every day','Short daily session','∞','#B69CF0',0)]
pcards = ''
for name, meta, goal, n, col, pct in progs:
    bar = u'''<div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
        <div style="height: 5px; border-radius: 3px; background: #1E222A;"><div style="width: %d%%; height: 5px; border-radius: 3px; background: %s;"></div></div>
        <span style="font-size: 11px; font-weight: 700; color: %s;">Week 2 of 4 · %d%% complete</span>
      </div>''' % (pct, col, col, pct) if pct else ''
    pcards += u'''<div style="border-radius: 20px; background: #14161B; border: 1px solid %s; padding: 15px 16px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
        <div style="display: flex; flex-direction: column; gap: 3px;">
          <span class="d" style="font-size: 20px; line-height: 1.1;">%s</span>
          <span style="font-size: 12px; font-weight: 600; color: #8B929C;">%s</span>
        </div>
        <span style="height: 24px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,0.05); color: %s; font-size: 11px; font-weight: 800; display: flex; align-items: center; flex-shrink: 0;">%s</span>
      </div>
      <span style="font-size: 12px; font-weight: 600; color: #6D747E;">%s · %s workouts</span>
      %s
    </div>''' % ('#39421F' if pct else '#1C2027', name, goal, col, meta, goal, n, bar)

cal = ''
for i, st in enumerate(['done','rest','done','rest','today','rest','rest','done','rest','done','plan','plan','plan','plan']):
    bg = {'done':'#D7F25A','rest':'#15181E','today':'#1B1F26','plan':'#15181E'}[st]
    bd = '1px solid #D7F25A' if st == 'today' else '1px solid #1E222A'
    inner = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10130A" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg>' if st == 'done' else '<span style="font-size: 11px; font-weight: 700; color: %s;">%d</span>' % ('#D7F25A' if st == 'today' else '#565C66', i+1)
    cal += u'<div style="height: 36px; border-radius: 10px; background: %s; border: %s; display: flex; align-items: center; justify-content: center;">%s</div>' % (bg, bd, inner)

programs = u'''
<div style="__FRAME__">
  <div style="padding: 52px 20px 0 20px; display: flex; flex-direction: column; gap: 16px;">
    <div class="d" style="font-size: 28px;">Programs</div>
    <div style="border-radius: 22px; background: linear-gradient(150deg, #1B2114 0%, #14161B 60%); border: 1px solid #2C331E; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 10px; font-weight: 800; color: #D7F25A; letter-spacing: 0.12em;">ACTIVE PROGRAM</span>
        <span style="font-size: 11px; font-weight: 700; color: #8B929C;">Workout 5 of 12</span>
      </div>
      <div style="display: flex; align-items: baseline; justify-content: space-between;">
        <span class="d" style="font-size: 24px;">Full Body Starter</span>
        <span class="d" style="font-size: 24px; color: #D7F25A;">42%</span>
      </div>
      <div style="height: 6px; border-radius: 3px; background: #22271A;"><div style="width: 42%; height: 6px; border-radius: 3px; background: #D7F25A;"></div></div>
      <div style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; margin-top: 4px;">__CAL__</div>
      <div style="display: flex; gap: 14px; margin-top: 2px;">
        <span style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #8B929C;"><span style="width: 8px; height: 8px; border-radius: 3px; background: #D7F25A;"></span>Completed</span>
        <span style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #8B929C;"><span style="width: 8px; height: 8px; border-radius: 3px; border: 1px solid #D7F25A;"></span>Today</span>
        <span style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #8B929C;"><span style="width: 8px; height: 8px; border-radius: 3px; background: #21252C;"></span>Rest</span>
      </div>
    </div>
    <div class="d" style="font-size: 14px; color: #C8CED6; letter-spacing: 0.08em;">All programs</div>
  </div>

  <div style="flex-grow: 1; overflow: hidden; padding: 12px 20px 0 20px; display: flex; flex-direction: column; gap: 10px;">__CARDS__</div>

  <div style="height: 82px; flex-shrink: 0; border-top: 1px solid #1A1D24; background: #101216; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 10px 8px 0 8px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linejoin="round"><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Home</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg><span style="font-size: 10px; font-weight: 700; color: #D7F25A;">Programs</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linecap="round"><path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Library</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linecap="round"><path d="M5 19V9M12 19V5M19 19v-6"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Progress</span></div>
  </div>
</div>
'''
write('Programs.dc.html', programs.replace('__FRAME__', FRAME).replace('__CAL__', cal).replace('__CARDS__', pcards))

# ---------- Progress ----------
bars = [('Legs', 96), ('Core', 78), ('Chest', 54), ('Back', 32), ('Arms', 46), ('Glutes', 68)]
mb = ''
for n, v in bars:
    mb += u'''<div style="display: flex; align-items: center; gap: 10px;">
      <span style="width: 48px; font-size: 12px; font-weight: 700; color: #A7AEB8;">%s</span>
      <div style="flex-grow: 1; height: 8px; border-radius: 4px; background: #1A1E25;"><div style="width: %d%%; height: 8px; border-radius: 4px; background: %s;"></div></div>
      <span style="width: 26px; text-align: right; font-size: 11px; font-weight: 700; color: #6D747E;">%d%%</span>
    </div>''' % (n, v, '#D7F25A' if v > 60 else 'rgba(215,242,90,0.45)', v)

weeks = [40, 65, 30, 80, 55, 95, 70, 100]
spark = ''
for i, v in enumerate(weeks):
    spark += u'<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; flex-grow: 1;"><div style="width: 100%%; height: %dpx; border-radius: 6px 6px 3px 3px; background: %s;"></div><span style="font-size: 9px; font-weight: 700; color: #565C66;">%d</span></div>' % (
        int(v * 0.86), '#D7F25A' if i == 7 else '#242A32', i + 1)

hist = [('Full Body Starter', 'Today · 17:42', '156 kcal', 4),
        ('Strong Core', 'Yesterday · 12:10', '98 kcal', 3),
        ('7 Minute Daily', 'Mon · 07:20', '64 kcal', 2)]
hrows = ''
for n, when, kcal, rate in hist:
    dots = ''.join('<span style="width: 6px; height: 6px; border-radius: 999px; background: %s;"></span>' % ('#D7F25A' if i < rate else '#2A303A') for i in range(5))
    hrows += u'''<div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 16px; background: #14161B; border: 1px solid #1C2027;">
      <div style="width: 38px; height: 38px; border-radius: 12px; background: rgba(215,242,90,0.10); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg></div>
      <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 3px;">
        <span style="font-size: 13px; font-weight: 700; color: #E7EBF0;">%s</span>
        <span style="font-size: 11px; font-weight: 600; color: #6D747E;">%s · %s</span>
      </div>
      <div style="display: flex; gap: 4px;">%s</div>
    </div>''' % (n, when, kcal, dots)

progress = u'''
<div style="__FRAME__">
  <div style="padding: 52px 20px 0 20px; display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: baseline; justify-content: space-between;">
      <div class="d" style="font-size: 28px;">Progress</div>
      <span style="font-size: 12px; font-weight: 700; color: #6D747E;">All time</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;">
      <div style="height: 86px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;"><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">WORKOUTS</span><span class="d" style="font-size: 30px; line-height: 1;">24</span></div>
      <div style="height: 86px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;"><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">TRAINING TIME</span><span class="d" style="font-size: 30px; line-height: 1;">6h 42m</span></div>
      <div style="height: 86px; border-radius: 18px; background: linear-gradient(150deg, rgba(255,122,69,0.14), #14161B 70%); border: 1px solid #3A2318; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;"><span style="font-size: 10px; font-weight: 800; color: #9A7E70; letter-spacing: 0.1em;">CURRENT STREAK</span><span class="d" style="font-size: 30px; line-height: 1; color: #FF9166;">5 days</span></div>
      <div style="height: 86px; border-radius: 18px; background: #14161B; border: 1px solid #1E222A; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;"><span style="font-size: 10px; font-weight: 800; color: #6D747E; letter-spacing: 0.1em;">LONGEST STREAK</span><span class="d" style="font-size: 30px; line-height: 1;">12 days</span></div>
    </div>
  </div>

  <div style="flex-grow: 1; overflow: hidden; padding: 16px 20px 0 20px; display: flex; flex-direction: column; gap: 14px;">
    <div style="border-radius: 20px; background: #14161B; border: 1px solid #1E222A; padding: 15px 16px; display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: baseline; justify-content: space-between;">
        <span class="d" style="font-size: 14px; color: #C8CED6; letter-spacing: 0.08em;">Weekly volume</span>
        <span style="font-size: 11px; font-weight: 700; color: #6D747E;">last 8 weeks</span>
      </div>
      <div style="display: flex; align-items: flex-end; gap: 7px; height: 100px;">__SPARK__</div>
    </div>

    <div style="border-radius: 20px; background: #14161B; border: 1px solid #1E222A; padding: 15px 16px; display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: baseline; justify-content: space-between;">
        <span class="d" style="font-size: 14px; color: #C8CED6; letter-spacing: 0.08em;">Muscle balance</span>
        <span style="font-size: 11px; font-weight: 700; color: #6D747E;">last 30 days</span>
      </div>
      <div style="display: flex; gap: 14px; align-items: center;">
        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">__BARS__</div>
        __MB__
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 9px;">
      <div class="d" style="font-size: 14px; color: #C8CED6; letter-spacing: 0.08em;">History</div>
      __HIST__
    </div>
  </div>

  <div style="height: 82px; flex-shrink: 0; border-top: 1px solid #1A1D24; background: #101216; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 10px 8px 0 8px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linejoin="round"><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Home</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Programs</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D747E" stroke-width="1.9" stroke-linecap="round"><path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8"/></svg><span style="font-size: 10px; font-weight: 700; color: #6D747E;">Library</span></div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7F25A" stroke-width="1.9" stroke-linecap="round"><path d="M5 19V9M12 19V5M19 19v-6"/></svg><span style="font-size: 10px; font-weight: 700; color: #D7F25A;">Progress</span></div>
  </div>
</div>
'''
progress = (progress.replace('__FRAME__', FRAME).replace('__SPARK__', spark).replace('__BARS__', mb).replace('__HIST__', hrows)
    .replace('__MB__', back(60, 115, GLUTE=P, HAM=S, LAT=S, TRAP=S)))
write('Progress.dc.html', progress)

# taller frames for scrolling pages
for f, h in [('ExerciseDetail.dc.html', 1180), ('Progress.dc.html', 1000)]:
    s = open(f).read().replace('height: 844px', 'height: %dpx' % h)
    open(f, 'w').write(s)
    print('resized', f, h)
