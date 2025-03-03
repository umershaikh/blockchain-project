const Footer = () => {
   return (
      <footer>
         <div className="footer-area footer-bg" style={{ backgroundImage: `url(/assets/img/bg/footer_bg.png)` }}>
            <div className="footer-bottom">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="copyright-text">
                        <p>Copyright © 2025. All rights reserved.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="footer-shape-wrap">
               <img src="/assets/img/images/footer_shape01.png" alt="" className="alltuchtopdown" />
               <img src="/assets/img/images/footer_shape02.png" alt="" className="leftToRight" />
            </div>
         </div>
      </footer>
   )
}

export default Footer;
