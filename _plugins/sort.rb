module Jekyll
  
  module Filters
    
    def sort(string)
  
      return string.split('|').sort.collect{|li| li.gsub(/\d*#/, '')}.join('')

    end

  end
  
end