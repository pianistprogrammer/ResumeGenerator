
       function Declarations() {
           //Symbols as used in USGS PP 1395: Map Projections - A Working Manual

           DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
               6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3];
           DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982,
               296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052, 300.8021499];
           Item = 0;//Default
           k0 = 0.9996;//scale on central meridian
           a = DatumEqRad[Item];//equatorial radius, meters.
           f = 1 / DatumFlat[Item];//polar flattening.
           b = a * (1 - f);//polar axis.
           e = Math.sqrt(1 - b * b / a * a);//eccentricity
           drad = Math.PI / 180;//Convert degrees to radians)
           latd = 0;//latitude in degrees
           phi = 0;//latitude (north +, south -), but uses phi in reference
           e0 = e / Math.sqrt(1 - e * e);//e prime in reference
           N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi)), 2);
           T = Math.pow(Math.tan(phi), 2);
           C = Math.pow(e * Math.cos(phi), 2);
           lng = 0;//Longitude (e = +, w = -) - can't use long - reserved word
           lng0 = 0;//longitude of central meridian
           lngd = 0;//longitude in degrees
           M = 0;//M requires calculation
           x = 0;//x coordinate
           y = 0;//y coordinate
           k = 1;//local scale
           utmz = 30;//utm zone
           zcm = 0;//zone central meridian
           DigraphLetrsE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
           DigraphLetrsN = "ABCDEFGHJKLMNPQRSTUV";

           OOZok = false;
       }

//Close declarations
function GeogToUTM(lat, log){
    //Convert Latitude and Longitude to UTM
    Declarations();
    k0 = 0.9996;//scale on central meridian
    b = a*(1-f);//polar axis.
    //alert(a+"   "+b);
    //alert(1-(b/a)*(b/a));
    e = Math.sqrt(1 - (b/a)*(b/a));//eccentricity
    //alert(e);
    //Input Geographic Coordinates
    //Decimal Degree Option
    latd0 = parseFloat(lat);
    lngd0 = parseFloat(log);
    lngd=lngd0;
    latd=latd0;
            
	
         
    if(isNaN(latd)|| isNaN(lngd)){
        alert("Non-Numeric Input Value");
    }
    if(latd <-90 || latd> 90){
        alert("Latitude must be between -90 and 90");
    }
    if(lngd <-180 || lngd > 180){
        alert("Latitude must be between -180 and 180");
    }

           
    phi = latd*drad;//Convert latitude to radians
    lng = lngd*drad;//Convert longitude to radians
    utmz = 1 + Math.floor((lngd+180)/6);//calculate utm zone
    latz = 0;//Latitude zone: A-B S of -80, C-W -80 to +72, X 72-84, Y,Z N of 84
    if (latd > -80 && latd < 72){latz = Math.floor((latd + 80)/8)+2;}
    if (latd > 72 && latd < 84){latz = 21;}
    if (latd > 84){latz = 23;}
		
    zcm = 3 + 6*(utmz-1) - 180;//Central meridian of zone
    //alert(utmz + "   " + zcm);
    //Calculate Intermediate Terms
    e0 = e/Math.sqrt(1 - e*e);//Called e prime in reference
    esq = (1 - (b/a)*(b/a));//e squared for use in expansions
    e0sq = e*e/(1-e*e);// e0 squared - always even powers
    //alert(esq+"   "+e0sq)
    N = a/Math.sqrt(1-Math.pow(e*Math.sin(phi),2));
    //alert(1-Math.pow(e*Math.sin(phi),2));
    //alert("N=  "+N);
    T = Math.pow(Math.tan(phi),2);
    //alert("T=  "+T);
    C = e0sq*Math.pow(Math.cos(phi),2);
    //alert("C=  "+C);
    A = (lngd-zcm)*drad*Math.cos(phi);
    //alert("A=  "+A);
    //Calculate M
    M = phi*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256)));
    M = M - Math.sin(2*phi)*(esq*(3/8 + esq*(3/32 + 45*esq/1024)));
    M = M + Math.sin(4*phi)*(esq*esq*(15/256 + esq*45/1024));
    M = M - Math.sin(6*phi)*(esq*esq*esq*(35/3072));
    M = M*a;//Arc length along standard meridian
    //alert(a*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256))));
    //alert(a*(esq*(3/8 + esq*(3/32 + 45*esq/1024))));
    //alert(a*(esq*esq*(15/256 + esq*45/1024)));
    //alert(a*esq*esq*esq*(35/3072));
    //alert(M);
    M0 = 0;//M0 is M for some origin latitude other than zero. Not needed for standard UTM
    //alert("M    ="+M);
    //Calculate UTM Values
    x = k0*N*A*(1 + A*A*((1-T+C)/6 + A*A*(5 - 18*T + T*T + 72*C -58*e0sq)/120));//Easting relative to CM
    x=x+500000;//Easting standard 
    y = k0*(M - M0 + N*Math.tan(phi)*(A*A*(1/2 + A*A*((5 - T + 9*C + 4*C*C)/24 + A*A*(61 - 58*T + T*T + 600*C - 330*e0sq)/720))));//Northing from equator
    yg = y + 10000000;//yg = y global, from S. Pole
    if (y < 0){y = 10000000+y;}
    //Output into UTM Boxes
    var zone = utmz;
    var easting = Math.round(10*(x))/10;
    var  northing = Math.round(10*y)/10;

    return {
        e: easting,
        n: northing,
        z: zone
    };
}

function UTMtoGeog(eastingValue,northingValue, zone) {
    //Convert UTM Coordinates to Geographic
    Declarations();
    k0 = 0.9996;//scale on central meridian
    b = a * (1 - f);//polar axis.
    e = Math.sqrt(1 - (b / a) * (b / a));//eccentricity
    e0 = e / Math.sqrt(1 - e * e);//Called e prime in reference
    esq = (1 - (b / a) * (b / a));//e squared for use in expansions
    e0sq = e * e / (1 - e * e);// e0 squared - always even powers
    x = eastingValue;
    if (x < 160000 || x > 840000) {
        alert("Outside permissible range of easting values \n Results may be unreliable \n Use with caution");
    }
    y = northingValue;
    //alert(y)
    if (y < 0) { alert("Negative values not allowed \n Results may be unreliable \n Use with caution"); }
    if (y > 10000000) { alert("Northing may not exceed 10,000,000 \n Results may be unreliable \n Use with caution"); }
    utmz = zone;
    zcm = 3 + 6 * (utmz - 1) - 180;//Central meridian of zone
    e1 = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e));//Called e1 in USGS PP 1395 also
    M0 = 0;//In case origin other than zero lat - not needed for standard UTM
    M = M0 + y / k0;//Arc length along standard meridian.

    mu = M / (a * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256))));
    phi1 = mu + e1 * (3 / 2 - 27 * e1 * e1 / 32) * Math.sin(2 * mu) + e1 * e1 * (21 / 16 - 55 * e1 * e1 / 32) * Math.sin(4 * mu);//Footprint Latitude
    phi1 = phi1 + e1 * e1 * e1 * (Math.sin(6 * mu) * 151 / 96 + e1 * Math.sin(8 * mu) * 1097 / 512);
    C1 = e0sq * Math.pow(Math.cos(phi1), 2);
    T1 = Math.pow(Math.tan(phi1), 2);
    N1 = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi1), 2));
    R1 = N1 * (1 - e * e) / (1 - Math.pow(e * Math.sin(phi1), 2));
    D = (x - 500000) / (N1 * k0);
    phi = (D * D) * (1 / 2 - D * D * (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e0sq) / 24);
    phi = phi + Math.pow(D, 6) * (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e0sq - 3 * C1 * C1) / 720;
    phi = phi1 - (N1 * Math.tan(phi1) / R1) * phi;

    //Output Latitude
    var outputLat=Math.floor(1000000 * phi / drad) / 1000000;

    //Longitude
    lng = D * (1 + D * D * ((-1 - 2 * T1 - C1) / 6 + D * D * (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e0sq + 24 * T1 * T1) / 120)) / Math.cos(phi1);
    lngd = zcm + lng / drad;

    //Output Longitude
    var outputLon = Math.floor(1000000 * lngd) / 1000000;
    //Parse DMS
    return {lat:outputLat,lon:outputLon}
}//End UTM to Geog
Declarations();

