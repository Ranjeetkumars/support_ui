package com.pro.suppro.system.interceptor;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pro.suppro.system.multitenancy.TenantContext;
import com.pro.suppro.system.utills.CommonConstants;
import com.pro.suppro.system.utills.IsEmptyUtil;

import lombok.extern.slf4j.Slf4j;


/* 
 * @author VENKAT
 * @since 2019-04-01
 * @Time 10:26AM
 *
 */
@Slf4j
public class CommonDataInterceptor  extends HandlerInterceptorAdapter{
	private static long REQUEST_COUNT=1;
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        long startTime = System.currentTimeMillis();
        String tenatID=request.getHeader("X-TENANT-ID");
        System.out.println(tenatID+":::::::::::: tenatID " + tenatID); 
        if(!IsEmptyUtil.isNotBlank(tenatID)) {
        	tenatID=CommonConstants.DEFAULT_TEANTID;
        }
        TenantContext.setCurrentTenant(tenatID);
        String strRequestID="Req"+REQUEST_COUNT;
        System.out.println("CommonDataInterceptor.preHandle ---> "+strRequestID);
        System.out.println(strRequestID+":::::::::::: Request URL: " + request.getRequestURL());
        System.out.println(strRequestID+":::::::::::: Request IP: " + request.getRemoteHost());
        System.out.println(strRequestID+":::::::::::: Start Time: " + getCurrentDateAndTime(startTime)); 
        request.setAttribute("startTime", startTime); 
        request.setAttribute("reqid",strRequestID);
        REQUEST_COUNT++;
        return true;
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, 
            Object handler, ModelAndView modelAndView) throws Exception { 
//    	System.out.println("postHandle ---> "+request.getRequestURL()); 
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
            Object handler, Exception ex) throws Exception {
        long startTime = (Long) request.getAttribute("startTime");
        String sessionid=(String) request.getAttribute("reqid");
        long endTime = System.currentTimeMillis();
        System.out.println(sessionid+":::::::::::: AfterCompletion of Time Taken For Excecution: " + (endTime - startTime)+" ms");
    }
    
    private String getCurrentDateAndTime(long yourmilliseconds) {
    	SimpleDateFormat sdf = new SimpleDateFormat(CommonConstants.DATABASE_DATE_FORMAT);    
    	Date resultdate = new Date(yourmilliseconds);
//    	System.out.println(sdf.format(resultdate));
    	return sdf.format(resultdate);
    }
}
