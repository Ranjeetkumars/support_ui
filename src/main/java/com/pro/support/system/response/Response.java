package com.pro.support.system.response;
import java.util.List;
import lombok.Data;

/* @author Ranjeet kumar
* @since 2019-12-2
* @Time 3:19PM
*
*/
@Data
public class Response {
	String status;
	Integer responseCode;
	String Count;
	List<String> errorsMsgs;	
	String output;
	String serverIp;
}
