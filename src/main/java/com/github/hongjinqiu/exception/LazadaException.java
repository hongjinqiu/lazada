package com.github.hongjinqiu.exception;

/**
 * Lazada异常包装类
 * @author hongjinqiu 2019.05.15
 */
public class LazadaException extends RuntimeException {
	private static final long serialVersionUID = -6448531730347863278L;

	public LazadaException() {
		super();
	}

	public LazadaException(String message) {
		super(message);
	}

	public LazadaException(String message, Throwable cause) {
		super(message, cause);
	}

	public LazadaException(Throwable cause) {
		super(cause);
	}
}
