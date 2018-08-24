require 'faraday'
require 'json'

class Connection
  BASE = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

  def self.api
    Faraday.new(url: BASE) do |faraday|
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
      faraday.headers['Content-Type'] = 'application/json'
      faraday.headers['x-app-id'] = '9509f270'
      faraday.headers['x-app-key'] = 'eb598faa6204b9e713560759d5913b4e'
      faraday.headers['x-remote-user-id'] = '0'
    end
  end
end
