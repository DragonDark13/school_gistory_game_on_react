import * as React from 'react';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';

interface MySvgIconProps extends SvgIconProps {
    // Додайте додаткові пропси за вашими потребами
}

export default function Logo({...props}:MySvgIconProps) {
  return (
    <SvgIcon  {...props}>
      {/* credit: plus icon from https://heroicons.com/ */}
<svg xmlns="http://www.w3.org/2000/svg" width="144" viewBox="203 115 144 144" height="144" ><path d="M271.51122,243.39252c-3.45808,-0.12808 -6.91616,-0.51231 -10.24616,-1.28077v-53.40814l-30.48234,17.67463c3.20193,6.66001 7.8127,12.42348 13.57617,16.90618l-7.30039,7.30039c-12.93578,-10.63039 -21.2608,-26.76811 -21.2608,-44.6989c0,-16.39386 6.91616,-31.25081 17.80271,-41.75313l7.30039,7.30039c-9.09347,8.58116 -14.85694,20.87656 -14.85694,34.45273c0,3.58616 0.38424,7.17232 1.28077,10.63039l33.94043,-19.5958v-47.38852c3.33001,-0.76847 6.78808,-1.15269 10.24616,-1.28077zM293.45226,141.87431c-4.84667,-1.83388 -10.08632,-3.01279 -15.45696,-3.14379v-10.47929c23.18545,0.78595 42.96512,14.80201 51.87252,34.84366h-11.7892c-3.53677,-6.15658 -8.38343,-11.52722 -14.14705,-15.58795v91.43188c-3.27478,1.70289 -6.81154,3.27478 -10.47929,4.4537v-101.51821zM224.04996,136.10417c6.64749,-6.6475 14.28162,-11.79439 22.90241,-15.44066c8.92668,-3.77568 18.2759,-5.66351 28.04763,-5.66351c9.77171,0 19.12091,1.88783 28.04759,5.66351c8.62061,3.64627 16.25476,8.79315 22.90245,15.44066c6.6474,6.64745 11.79421,14.28159 15.44046,22.90241c3.77581,8.92665 5.66372,18.27585 5.66372,28.04759c0,9.77171 -1.88791,19.12091 -5.66372,28.04759c-3.64624,8.62089 -8.79305,16.25504 -15.44046,22.90245c-6.6474,6.6474 -14.28154,11.79421 -22.90245,15.44046c-8.92668,3.77581 -18.27588,5.66372 -28.04759,5.66372c-9.77177,0 -19.12098,-1.88791 -28.04763,-5.66372c-8.62081,-3.64624 -16.25494,-8.79305 -22.90241,-15.44046c-6.6475,-6.6474 -11.79438,-14.28154 -15.44065,-22.90245c-3.77568,-8.92668 -5.66351,-18.27588 -5.66351,-28.04759c0,-9.77168 1.88783,-19.12088 5.66351,-28.04759c3.64627,-8.62076 8.79315,-16.25489 15.44065,-22.90241zM227.96919,234.08511c6.13786,6.13776 13.18529,10.88943 21.14232,14.25501c8.23653,3.48371 16.86603,5.22556 25.88849,5.22556c9.02247,0 17.65188,-1.74185 25.88824,-5.22556c7.9571,-3.36559 15.00454,-8.11726 21.1423,-14.25501c6.13804,-6.13804 10.88985,-13.18561 14.25543,-21.14272c3.48371,-8.23636 5.22556,-16.86577 5.22556,-25.88824c0,-9.02244 -1.74185,-17.65192 -5.22556,-25.88845c-3.36559,-7.95702 -8.11739,-15.00446 -14.25543,-21.14231c-6.13776,-6.13789 -13.18519,-10.88959 -21.1423,-14.25513c-8.23636,-3.48377 -16.86577,-5.22565 -25.88824,-5.22565c-9.02241,0 -17.65191,1.74188 -25.88849,5.22565c-7.95699,3.36553 -15.00443,8.11724 -21.14232,14.25513c-6.13788,6.13788 -10.88959,13.18531 -14.25512,21.14231c-3.48377,8.23659 -5.22565,16.86606 -5.22565,25.88845c0,9.02247 1.74188,17.65188 5.22565,25.88824c3.36553,7.9571 8.11724,15.00467 14.25512,21.14272z" data-paper-data="{&quot;isPathIcon&quot;:true}" fill="currentColor" id="element-id-61628"></path></svg>
    </SvgIcon>
  );
}