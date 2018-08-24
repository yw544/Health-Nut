require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get sessions_login_path
    assert_response :success
  end

  test "should get home" do
    get sessions_home_path
    assert_response :success
  end

  test "should get profile" do
    get sessions_profile_path
    assert_response :success
  end

  test "should get setting" do
    get sessions_setting_path
    assert_response :success
  end

end
