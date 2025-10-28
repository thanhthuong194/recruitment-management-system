package org.openapitools.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * ErrorDetail
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-10-28T11:03:36.438763291+07:00[Asia/Ho_Chi_Minh]", comments = "Generator version: 7.16.0")
public class ErrorDetail {

  private String field;

  private String issue;

  public ErrorDetail() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ErrorDetail(String field, String issue) {
    this.field = field;
    this.issue = issue;
  }

  public ErrorDetail field(String field) {
    this.field = field;
    return this;
  }

  /**
   * Get field
   * @return field
   */
  @NotNull 
  @Schema(name = "field", example = "email", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("field")
  public String getField() {
    return field;
  }

  public void setField(String field) {
    this.field = field;
  }

  public ErrorDetail issue(String issue) {
    this.issue = issue;
    return this;
  }

  /**
   * Get issue
   * @return issue
   */
  @NotNull 
  @Schema(name = "issue", example = "Invalid email format", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("issue")
  public String getIssue() {
    return issue;
  }

  public void setIssue(String issue) {
    this.issue = issue;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ErrorDetail errorDetail = (ErrorDetail) o;
    return Objects.equals(this.field, errorDetail.field) &&
        Objects.equals(this.issue, errorDetail.issue);
  }

  @Override
  public int hashCode() {
    return Objects.hash(field, issue);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ErrorDetail {\n");
    sb.append("    field: ").append(toIndentedString(field)).append("\n");
    sb.append("    issue: ").append(toIndentedString(issue)).append("\n");
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

