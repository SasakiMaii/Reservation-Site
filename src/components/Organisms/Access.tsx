import React from 'react'
import style from "../../styles/top/_Top.module.scss"

export const Access = () => {
  return (
    <section className={style.test2} >
    <h2>アクセス</h2>
    <div className={style.roomsIntroductionFlex}>
    <div className={style.roomsIntroductionCols}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.4198765414803!2d139.7178380154845!3d35.66666208019767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b3eb5a3fcc3%3A0xa2fa829c2ecb4a37!2z44OZ44Or44OG5Y2X6Z2S5bGxLeKFoA!5e0!3m2!1sja!2sjp!4v1668920600739!5m2!1sja!2sjp" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div className={style.roomsIntroductionDetail}>
      <p>〒163-8001</p>
      <p>新宿区西新宿2-8-1 </p>
      <br />
      <p>新宿駅から徒歩5分</p>
      
    </div>
    </div>
  </section>
  )
}

export default Access;
