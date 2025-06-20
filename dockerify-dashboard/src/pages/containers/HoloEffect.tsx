import { useEffect } from 'react';

const HoloEffect = () => {
  useEffect(() => {
    let x: ReturnType<typeof setTimeout>;
    const cards = document.querySelectorAll<HTMLElement>('.card');
    const styleTag = document.querySelector<HTMLStyleElement>('.hover');

    if (!styleTag) return;

    const handleMove = (e: Event) => {
      e.preventDefault();

      const card = e.currentTarget as HTMLElement;

      let l: number, t: number;

      if (e.type === 'touchmove') {
        console.log('touchmove');
        const touch = (e as TouchEvent).touches[0];
        const rect = card.getBoundingClientRect();
        l = touch.clientX - rect.left;
        t = touch.clientY - rect.top;
      } else {
        const mouse = e as MouseEvent;
        l = mouse.offsetX;
        t = mouse.offsetY;
      }

      const h = card.offsetHeight;
      const w = card.offsetWidth;

      const px = Math.abs(Math.floor((100 / w) * l) - 100);
      const py = Math.abs(Math.floor((100 / h) * t) - 100);
      const pa = 50 - px + (50 - py);

      const lp = 50 + (px - 50) / 1.5;
      const tp = 50 + (py - 50) / 1.5;
      const px_spark = 50 + (px - 50) / 7;
      const py_spark = 50 + (py - 50) / 7;
      const p_opc = 20 + Math.abs(pa) * 1.5;

      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;

      const gradPos = `background-position: ${lp}% ${tp}%;`;
      const sparkPos = `background-position: ${px_spark}% ${py_spark}%;`;
      const opc = `opacity: ${p_opc / 100};`;

      cards.forEach((c) => c.classList.remove('active'));
      card.classList.remove('animated');
      card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

      styleTag.textContent = `
        .card:hover:before { ${gradPos} }
        .card:hover:after { ${sparkPos} ${opc} }
      `;

      if (e.type === 'touchmove') return;
      clearTimeout(x);
    };

    const handleLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      styleTag.textContent = '';
      card.removeAttribute('style');
      x = setTimeout(() => {
        card.classList.add('animated');
      }, 2500);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('touchmove', handleMove);
      card.addEventListener('mouseout', handleLeave);
      card.addEventListener('touchend', handleLeave);
      card.addEventListener('touchcancel', handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('touchmove', handleMove);
        card.removeEventListener('mouseout', handleLeave);
        card.removeEventListener('touchend', handleLeave);
        card.removeEventListener('touchcancel', handleLeave);
      });
    };
  }, []);

  return <style className="hover" />;
};

export default HoloEffect;
