let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Projetos/E-store
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 ~/Projetos/E-store
badd +0 src/pages/UserCarts.tsx
badd +1 src/pages/ProductsPage.tsx
argglobal
%argdel
$argadd ~/Projetos/E-store
edit src/pages/ProductsPage.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 43 + 27) / 54)
exe 'vert 1resize ' . ((&columns * 118 + 119) / 238)
exe '2resize ' . ((&lines * 43 + 27) / 54)
exe 'vert 2resize ' . ((&columns * 119 + 119) / 238)
exe '3resize ' . ((&lines * 8 + 27) / 54)
exe 'vert 3resize ' . ((&columns * 118 + 119) / 238)
exe '4resize ' . ((&lines * 8 + 27) / 54)
exe 'vert 4resize ' . ((&columns * 119 + 119) / 238)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 1 - ((0 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
lcd ~/Projetos/E-store
wincmd w
argglobal
if bufexists(fnamemodify("~/Projetos/E-store/src/pages/UserCarts.tsx", ":p")) | buffer ~/Projetos/E-store/src/pages/UserCarts.tsx | else | edit ~/Projetos/E-store/src/pages/UserCarts.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/Projetos/E-store/src/pages/UserCarts.tsx
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 5 - ((4 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 0
lcd ~/Projetos/E-store
wincmd w
argglobal
if bufexists(fnamemodify("term://~/Projetos/E-store//10772:/usr/bin/zsh;\#toggleterm\#1", ":p")) | buffer term://~/Projetos/E-store//10772:/usr/bin/zsh;\#toggleterm\#1 | else | edit term://~/Projetos/E-store//10772:/usr/bin/zsh;\#toggleterm\#1 | endif
if &buftype ==# 'terminal'
  silent file term://~/Projetos/E-store//10772:/usr/bin/zsh;\#toggleterm\#1
endif
balt ~/Projetos/E-store/src/pages/ProductsPage.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 12 - ((6 * winheight(0) + 4) / 8)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 0
lcd ~/Projetos/E-store
wincmd w
argglobal
if bufexists(fnamemodify("term://~/Projetos/E-store//10856:/usr/bin/zsh;\#toggleterm\#2", ":p")) | buffer term://~/Projetos/E-store//10856:/usr/bin/zsh;\#toggleterm\#2 | else | edit term://~/Projetos/E-store//10856:/usr/bin/zsh;\#toggleterm\#2 | endif
if &buftype ==# 'terminal'
  silent file term://~/Projetos/E-store//10856:/usr/bin/zsh;\#toggleterm\#2
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 14 - ((7 * winheight(0) + 4) / 8)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 0
lcd ~/Projetos/E-store
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 43 + 27) / 54)
exe 'vert 1resize ' . ((&columns * 118 + 119) / 238)
exe '2resize ' . ((&lines * 43 + 27) / 54)
exe 'vert 2resize ' . ((&columns * 119 + 119) / 238)
exe '3resize ' . ((&lines * 8 + 27) / 54)
exe 'vert 3resize ' . ((&columns * 118 + 119) / 238)
exe '4resize ' . ((&lines * 8 + 27) / 54)
exe 'vert 4resize ' . ((&columns * 119 + 119) / 238)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
