package org.openapitools.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openapitools.model.ErrorDetail;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * ErrorResponse
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-10-28T11:03:36.438763291+07:00[Asia/Ho_Chi_Minh]", comments = "Generator version: 7.16.0")
public class ErrorResponse {

  private Boolean success;

  private String errorcode;

  private String message;

  @Valid
  private List<@Valid ErrorDetail> details = new ArrayList<>();

  public ErrorResponse() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ErrorResponse(Boolean success, String errorcode, String message) {
    this.success = success;
    this.errorcode = errorcode;
    this.message = message;
  }

  public ErrorResponse success(Boolean success) {
    this.success = success;
    return this;
  }

  /**
   * Get success
   * @return success
   */
  @NotNull 
  @Schema(name = "success", example = "false", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("success")
  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public ErrorResponse errorcode(String errorcode) {
    this.errorcode = errorcode;
    return this;
  }

  /**
   * Get errorcode
   * @return errorcode
   */
  @NotNull 
  @Schema(name = "errorcode", example = "USER_NOT_FOUND", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("errorcode")
  public String getErrorcode() {
    return errorcode;
  }

  public void setErrorcode(String errorcode) {
    this.errorcode = errorcode;
  }

  public ErrorResponse message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   */
  @NotNull 
  @Schema(name = "message", example = "User not found", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("message")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ErrorResponse details(List<@Valid ErrorDetail> details) {
    this.details = details;
    return this;
  }

  public ErrorResponse addDetailsItem(ErrorDetail detailsItem) {
    if (this.details == null) {
      this.details = new ArrayList<>();
    }
    this.details.add(detailsItem);
    return this;
  }

  /**
   * Get details
   * @return details
   */
  @Valid 
  @Schema(name = "details", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("details")
  public List<@Valid ErrorDetail> getDetails() {
    return details;
  }

  public void setDetails(List<@Valid ErrorDetail> details) {
    this.details = details;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ErrorResponse errorResponse = (ErrorResponse) o;
    return Objects.equals(this.success, errorResponse.success) &&
        Objects.equals(this.errorcode, errorResponse.errorcode) &&
        Objects.equals(this.message, errorResponse.message) &&
        Objects.equals(this.details, errorResponse.details);
  }

  @Override
  public int hashCode() {
    return Objects.hash(success, errorcode, message, details);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ErrorResponse {\n");
    sb.append("    success: ").append(toIndentedString(success)).append("\n");
    sb.append("    errorcode: ").append(toIndentedString(errorcode)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    details: ").append(toIndentedString(details)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

