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
 * UserBasicInfo
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-10-28T11:03:36.438763291+07:00[Asia/Ho_Chi_Minh]", comments = "Generator version: 7.16.0")
public class UserBasicInfo {

  private String id;

  private String username;

  private String email;

  private String fullName;

  private String role;

  public UserBasicInfo() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public UserBasicInfo(String id, String username, String email, String fullName, String role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.role = role;
  }

  public UserBasicInfo id(String id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   */
  @NotNull 
  @Schema(name = "id", example = "user01", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public UserBasicInfo username(String username) {
    this.username = username;
    return this;
  }

  /**
   * Get username
   * @return username
   */
  @NotNull 
  @Schema(name = "username", example = "lethanhthuong", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("username")
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public UserBasicInfo email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Get email
   * @return email
   */
  @NotNull 
  @Schema(name = "email", example = "lethanhthuong19423@gmail.com", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("email")
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public UserBasicInfo fullName(String fullName) {
    this.fullName = fullName;
    return this;
  }

  /**
   * Get fullName
   * @return fullName
   */
  @NotNull 
  @Schema(name = "fullName", example = "Lê Thanh Thưởng", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("fullName")
  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public UserBasicInfo role(String role) {
    this.role = role;
    return this;
  }

  /**
   * Get role
   * @return role
   */
  @NotNull 
  @Schema(name = "role", example = "RECTOR", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("role")
  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UserBasicInfo userBasicInfo = (UserBasicInfo) o;
    return Objects.equals(this.id, userBasicInfo.id) &&
        Objects.equals(this.username, userBasicInfo.username) &&
        Objects.equals(this.email, userBasicInfo.email) &&
        Objects.equals(this.fullName, userBasicInfo.fullName) &&
        Objects.equals(this.role, userBasicInfo.role);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, email, fullName, role);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UserBasicInfo {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    fullName: ").append(toIndentedString(fullName)).append("\n");
    sb.append("    role: ").append(toIndentedString(role)).append("\n");
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

